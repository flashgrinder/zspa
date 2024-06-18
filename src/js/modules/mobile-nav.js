function mobileNav() {
	// Mobile nav button
	const navBtn = document.querySelector('.js-mobile-nav-btn');
	const nav = document.querySelector('.js-menu');
	const menuIcon = document.querySelector('.js-mobile-nav-icon');

	navBtn.onclick = function () {
		nav.classList.toggle('is-open');
		menuIcon.classList.toggle('is-active');
		document.body.classList.toggle('no-scroll');
	};
}

export default mobileNav;