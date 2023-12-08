const tl = gsap.timeline();
tl.from([".logo, .navigation"], {
  duration: 1,
  opacity: 0,
  y: 40,
  stagger: { amount: 0.4 }
})
  .from(
".left-ctr h1",
{ opacity: 0, duration: 1, y: 100, skewY: 10, stagger: { amount: 0.4 } },
"-=1"
)
  .from(
[".left-ctr-2-1, .left-ctr-2-2"],
{ opacity: 0, duration: 1, y: 100, stagger: { amount: 0.4 } },
"-=1"
)
  .from(".right-ctr", { duration: 1, x: 500, skewX: 50 }, "-=1");
