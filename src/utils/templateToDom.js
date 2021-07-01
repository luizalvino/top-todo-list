export default function stringToDom(template) {
  let wrapper = document.createElement("div");
  wrapper.innerHTML = template;
  return wrapper.firstElementChild;
}
