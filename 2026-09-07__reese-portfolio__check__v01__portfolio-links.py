"""Validate built portfolio pages and public links, without installing dependencies.
Run after npm run build. Pass --external to check outbound HTTP destinations.
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, unquote
from concurrent.futures import ThreadPoolExecutor
import json, subprocess, sys

ROOT = Path(__file__).resolve().parent
BASE = 'https://reesehollister.com'
SQUARE = 'https://reesehollister.square.site/'

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.links=[]; self.assets=[]; self.ids=set(); self.h1=0; self.meta={}; self.titles=0; self.empty_links=0
        self.feed(text)
    def handle_starttag(self, tag, pairs):
        a=dict(pairs)
        if 'id' in a: self.ids.add(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='title': self.titles+=1
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='a': self.links.append(a.get('href',''))
        if tag in ['img','video','source','script','iframe'] and a.get('src'): self.assets.append(a['src'])
        if a.get('poster'): self.assets.append(a['poster'])
        if tag=='link' and a.get('rel') in ['stylesheet','icon','apple-touch-icon']: self.assets.append(a.get('href',''))

def buildfile(path):
    p=ROOT/'dist'/unquote(path.lstrip('/'))
    if p.is_dir(): return p/'index.html'
    if p.suffix: return p
    return p/'index.html'

projects=json.loads(subprocess.check_output(['node','--experimental-strip-types','--input-type=module','-e',"import {projects} from './src/data/projects.ts'; console.log(JSON.stringify(projects.map(p=>p.slug)))"],cwd=ROOT,text=True))
routes=['/','/experience/','/about/','/resume/','/contact/','/coaching/','/research/','/teaching/','/writing/','/works/','/projects/']+['/projects/'+slug+'/' for slug in projects]
failures=[]; external=set(); checks=0; square_count=0; pages={}
for route in routes:
    f=buildfile(route)
    if not f.exists(): failures.append(f'Missing route: {route}'); continue
    html=f.read_text(); page=Page(html); pages[route]=page
    for ok,msg in [(page.h1==1,'one H1'),(page.titles==1,'one title'),(bool(page.meta.get('description')),'description'),(bool(page.meta.get('og:title')),'OG title'),(bool(page.meta.get('og:description')),'OG description'),(bool(page.meta.get('twitter:title')),'Twitter title'),('AI-Fluent' not in html and 'Claude Corps' not in html,'old identity absent')]:
        checks+=1
        if not ok: failures.append(f'{route}: {msg}')
    for href in page.links+page.assets:
        if href.startswith(('mailto:','tel:','data:')): continue
        if not href or href=='#': failures.append(f'{route}: empty link'); continue
        u=urlsplit(urljoin(BASE+route,href))
        if u.netloc and u.netloc!='reesehollister.com':
            external.add(u._replace(fragment='').geturl())
            if 'square.site' in u.netloc:
                square_count+=1
                if href!=SQUARE: failures.append(f'{route}: noncanonical Square link: {href}')
            continue
        target=buildfile(u.path); checks+=1
        if not target.exists(): failures.append(f'{route}: missing target {href}'); continue
        if u.fragment and target.suffix=='.html' and not u.fragment.startswith('/'):
            if u.fragment not in Page(target.read_text()).ids: failures.append(f'{route}: missing anchor {href}')
        if href in page.assets and target.suffix.lower() in ['.jpg','.jpeg','.png','.webp']:
            magic=target.read_bytes()[:12]
            if not (magic.startswith(b'\xff\xd8') or magic.startswith(b'\x89PNG') or magic.startswith(b'RIFF')): failures.append(f'{route}: invalid image {href}')
for old,new in [('/youtube/','/projects/public-history-engagement/'),('/workflows/','/projects/applied-ai-workflows/')]:
    redirect=buildfile(old)
    if not redirect.exists() or new not in redirect.read_text(): failures.append(f'Legacy {old} redirect missing')
if square_count<6: failures.append('Square CTA coverage unexpectedly low')

external_results=[]
def check_url(url):
    # curl uses the host certificate store; do not disable TLS validation.
    result=subprocess.run(['curl','--location','--silent','--show-error','--output','/dev/null','--write-out','%{http_code}\t%{url_effective}','--max-time','15',url],capture_output=True,text=True)
    parts=result.stdout.split('\t',1)
    return {'url':url,'status':int(parts[0]) if parts and parts[0].isdigit() and parts[0]!='000' else 'unverified','final_url':parts[1] if len(parts)>1 else url,**({'reason':result.stderr.strip()} if result.returncode else {})}
if '--external' in sys.argv:
    with ThreadPoolExecutor(max_workers=10) as pool: external_results=list(pool.map(check_url,sorted(external)))
report={'pages_checked':len(pages),'internal_checks':checks,'square_occurrences':square_count,'internal_failures':failures,'external_destinations':len(external),'external_results':external_results}
print(json.dumps(report,indent=2))
sys.exit(1 if failures else 0)
