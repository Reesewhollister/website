export default function remarkGfmShim() {
  return function passthrough(tree) {
    return tree;
  };
}
