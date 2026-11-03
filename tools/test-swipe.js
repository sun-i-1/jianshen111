const drawer = document.querySelector("#actionDrawer");
const grabber = document.querySelector(".drawer-grabber");
const layer = document.querySelector("#drawerLayer");

grabber.dispatchEvent(new PointerEvent("pointerdown", {
  bubbles: true,
  cancelable: true,
  pointerId: 7,
  pointerType: "touch",
  clientX: 180,
  clientY: 300
}));
drawer.dispatchEvent(new PointerEvent("pointermove", {
  bubbles: true,
  cancelable: true,
  pointerId: 7,
  pointerType: "touch",
  clientX: 180,
  clientY: 430
}));
const draggedOffset = drawer.style.transform;
drawer.dispatchEvent(new PointerEvent("pointerup", {
  bubbles: true,
  cancelable: true,
  pointerId: 7,
  pointerType: "touch",
  clientX: 180,
  clientY: 430
}));
JSON.stringify({
  draggedOffset,
  closedAfterSwipe: !layer.classList.contains("is-open"),
  draggingClass: drawer.classList.contains("is-dragging")
});
