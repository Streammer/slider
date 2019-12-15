
//select carousel
const carousel = document.querySelector(".carousel");
//select next button
const nextButton = document.querySelector(".right-btn");
//select left button
const previousButton = document.querySelector(".left-btn")
//select the nav
const nav = document.querySelector(".nav");
//select all the dots
const dots = [...nav.children];
//select all the slides inside the carousel
const slides = [...carousel.children];
//calculate the slides width

let slideWidth = slides[0].getBoundingClientRect().width;

//position the slides horisontaly
/*function positionSlides(slides){
		for(let index = 0; index < slides.length; index++){
			slides[index].slyle.left = slideWidth * index + 'px';
		}
}
positionSlides(slides);
*/
//on right button click, we move (translateX) the carousel to the left
nextButton.addEventListener("click", function(){
	const currentSlide = carousel.querySelector(".active");
	const nextSlide = currentSlide.nextElementSibling;
	moveToSlide(carousel, currentSlide, nextSlide);
	hideButton(nextSlide, slides);
	moveToDot(nextSlide, slides, nav, dots);
	
});

//on left button click, we move (translateX) the carousel to the right
previousButton.addEventListener("click", function(){
	const currentSlide = carousel.querySelector(".active");
	const previousSlide = currentSlide.previousElementSibling;
	moveToSlide(carousel, currentSlide, previousSlide);
	hideButton(previousSlide, slides);
	moveToDot(previousSlide, slides, nav, dots);
});

//on dot click
nav.addEventListener("click", function(e){
	//if we didn't clcik on a dot, we exit
	if(e.target === nav) return;

	//select the clicked dot
	const targetDot = e.target;

	//select the current dot
	const currentDot = nav.querySelector(".active");
	//select the current slide
	const currentSlide = carousel.querySelector(".active");
	//find the index of the dot, so we can target the right slide
	let targetDotIndex = findIndex(targetDot, dots);

	//select the target slide
	const targetSlide = slides[targetDotIndex];
	moveToSlide(carousel, currentSlide, targetSlide);
	toggleActive(currentDot, targetDot);
	hideButton(targetSlide, slides);
})
//move to dot
function moveToDot(targetSlide, slides, nav, dots){
	let slideIndex = findIndex(targetSlide, slides);
	const currentDot = nav.querySelector(".active");
	const targetDot = dots[slideIndex];
	toggleActive(currentDot, targetDot);
}
//move to slide
function moveToSlide(carousel, currentSlide, targetSlide){
	const position = targetSlide.style.left;
	carousel.style.transform = `translateX(-${position})`;
	toggleActive(currentSlide, targetSlide);
}

//toggle active class
function toggleActive(current, target){
	current.classList.remove("active");
	target.classList.add("active");
}

//hide button
function hideButton(targetSlide, slides ){
	//if the target slide is the first slide the previous button must be hidden
	//and the next button must be shown
	if(targetSlide === slides[0]){
		previousButton.classList.add("hide");
		nextButton.classList.remove("hide");
	}else if(targetSlide === slides[slides.length - 1]){
		//if the target slide is the last slide the next button must hidden
		//and the previous button must be shown
		nextButton.classList.add("hide");
		previousButton.classList.remove("hide");
	}else{
		//if none of the above is true, we show both the next and the previous buttons
		previousButton.classList.remove("hide");
		nextButton.classList.remove("hide");
	}
}

//find index of an item an array of items
function findIndex(item, items){
	for(let index = 0; index < items.length; index++){
		if(item === items[index]){
			return index;
		}
	}
}