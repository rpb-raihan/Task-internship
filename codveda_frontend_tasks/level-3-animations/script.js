gsap.registerPlugin(ScrollTrigger);

const shape = document.querySelector(".shape");
const cards = document.querySelectorAll(".motion-card");

function introTimeline() {
  const tl = gsap.timeline();
  tl.from(".intro h1",{y:70,opacity:0,duration:1,ease:"power3.out"})
    .from(".intro p",{y:25,opacity:0,duration:.7,stagger:.12},"-=.55")
    .fromTo(shape,{rotation:-20,scale:.4,opacity:0},{rotation:0,scale:1,opacity:1,duration:1,ease:"back.out(1.7)"},"-=.2");
  return tl;
}
introTimeline();

gsap.from(cards,{
  y:70,opacity:0,duration:.8,stagger:.15,ease:"power2.out",
  scrollTrigger:{trigger:".cards",start:"top 80%",toggleActions:"play none none reverse"}
});

gsap.to(shape,{rotation:360,duration:8,ease:"none",repeat:-1});

document.querySelector("#replay").addEventListener("click",()=>{
  gsap.killTweensOf(".intro h1,.intro p,.shape");
  gsap.set([".intro h1",".intro p",".shape"],{clearProps:"all"});
  introTimeline();
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.timeScale(100);
}
