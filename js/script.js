// ========================================================================
// Header Submenu activation with click on arrow
document.addEventListener('DOMContentLoaded', function() {
    let subMenuArrow = document.querySelectorAll('.item-menu__arrow');
    if (subMenuArrow.length > 0) {
        subMenuArrow.forEach((arrow) => {
            arrow.addEventListener('click', (e) => {
                e.stopPropagation(); 
                arrow.parentElement.classList.toggle('item-menu__arrow-active');
            });
        });
        document.addEventListener('click', (e) => {
            subMenuArrow.forEach((arrow) => {
                arrow.parentElement.classList.remove('item-menu__arrow-active');
            });
        });
        document.querySelectorAll('.item-menu__submenu').forEach((submenu) => {
            submenu.addEventListener('click', (e) => {
                e.stopPropagation(); 
            });
        });
    }
});
// ========================================================================
// Header menu link hover activation
document.addEventListener('DOMContentLoaded', function() {
    let menuLink = document.querySelectorAll('.link-hover');
    menuLink.forEach((link) => {
        link.addEventListener('click', (e) => {
            menuLink.forEach(lnk => lnk.classList.remove('item-menu__hover-active'));
            link.classList.add('item-menu__hover-active');
        })
    })
})
// ========================================================================
// Header Burger menu
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenuIcon = document.querySelector('.burger-menu__icon');
    const menuBody = document.querySelector('.menu');
    if(burgerMenuIcon) {
        burgerMenuIcon.addEventListener('click', (e)=> {
            document.body.classList.toggle('__lock');
            burgerMenuIcon.classList.toggle('__cross');
            menuBody.classList.toggle('__left');
        })
    }
})
// ========================================================================
// Header moving classes
document.addEventListener('DOMContentLoaded', function() {
    let targetWidth = 767;
    let elDest = document.querySelector('.menu');
    let headeCon = document.querySelector('.header__container');

    function moveElements() {
        let currentWidth = window.innerWidth;
        let moveEl = document.querySelectorAll('.contacts-header');

        if (currentWidth < targetWidth && !localStorage.getItem('moved')) {
            moveEl.forEach(element => {
                element.classList.add('hidden');
                elDest.appendChild(element);
                setTimeout(() => {
                    element.classList.remove('hidden');
                }, 10);
            });
            localStorage.setItem('moved', 'true');
        } else if (currentWidth > targetWidth && localStorage.getItem('moved')) {
            moveEl.forEach(element => {
                element.classList.add('hidden');
                headeCon.appendChild(element);
                setTimeout(() => {
                    element.classList.remove('hidden');
                }, 10);
            });
            localStorage.removeItem('moved');
        }
    }

    if (window.innerWidth <= targetWidth) {
        let moveEl = document.querySelectorAll('.contacts-header');
        moveEl.forEach(element => {
            element.classList.add('hidden');
            elDest.appendChild(element);
            setTimeout(() => {
                element.classList.remove('hidden');
            }, 10);
        });
        localStorage.setItem('moved', 'true');
    }

    window.addEventListener('resize', moveElements);
});
// Show More Button
document.addEventListener("DOMContentLoaded", () => {
    const galleries = document.querySelectorAll(".tabs__gallery");

    if (!galleries.length) return;

    galleries.forEach(gallery => {
        const photos = Array.from(gallery.querySelectorAll(".tabs__block"));
        const showMoreButton = gallery.parentElement.querySelector(".showmore");

        if (!photos.length || !showMoreButton) return;

        const hideButton = document.createElement("div");
        const hideButtonBtn = document.createElement("button");
        hideButton.append(hideButtonBtn);
        hideButtonBtn.type = "button";
        hideButton.classList.add("tabs__hide");
        hideButtonBtn.classList.add("tabs__button", "btn");
        hideButtonBtn.innerHTML = "<span>Скрыть</span>";
        hideButton.style.display = "none";
        showMoreButton.parentElement.appendChild(hideButton);

        let visibleCount = getCurrentBreakpoint();

        function getCurrentBreakpoint() {
					const width = window.innerWidth;
			
						if (width <= 766) {
							return 2;
						} else {
							return 4;
						}
				}

        function showPhotos() {
            photos.forEach((photo, index) => {
                photo.classList.toggle("_visible", index < visibleCount);
            });

            showMoreButton.style.display = visibleCount >= photos.length ? "none" : "block";
            hideButton.style.display = visibleCount > photos.length ? "block" : "none";


        }

        photos.forEach(photo => photo.classList.remove("_visible"));
        showPhotos();

        showMoreButton.addEventListener("click", () => {
            visibleCount += getCurrentBreakpoint();
            showPhotos();
        });

        hideButton.addEventListener("click", () => {
            visibleCount = getCurrentBreakpoint();
            showPhotos();
        });

        window.addEventListener("resize", () => {
            let newCount = getCurrentBreakpoint();
            if (visibleCount < newCount) {
                visibleCount = newCount;
                showPhotos();
            }
        });
    });
});
// ========================================================================
// Tabs Control
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs('.services__tabs');
    initializeTabs('.works__tabs');
    
    function initializeTabs(selector) {
        if (document.querySelector(selector)) {
            let tabsContainer = document.querySelector(selector);
            if (!tabsContainer) return;
            
            let tabs = tabsContainer.querySelectorAll('.tabs__btn');
            let indicator = tabsContainer.querySelector('.tabs__indicator');
            let activeTab = tabsContainer.querySelector('.tabs__btn.tabs__active');
            let tabBoxes = tabsContainer.querySelectorAll('.tabs__box');
            
            if (activeTab) {
                moveIndicator(activeTab, indicator);
            }
            
            tabs.forEach((tab, index) => {
                tab.addEventListener('mouseenter', function() {
                    if (!tab.classList.contains('tabs__active')) {
                        moveIndicator(tab, indicator);
                    }
                });
                
                tab.addEventListener('mouseleave', function() {
                    if (activeTab) {
                        moveIndicator(activeTab, indicator);
                    } else {
                        indicator.style.width = '0';
                    }
                });
                
                tab.addEventListener('click', function() {
                    if (activeTab) {
                        activeTab.classList.remove('tabs__active');
                        tabBoxes.forEach(box => box.classList.remove('tabs__box-on'));
                    }
                    
                    tab.classList.add('tabs__active');
                    activeTab = tab;
                    moveIndicator(tab, indicator);
                    tabBoxes[index].classList.add('tabs__box-on');
                });
            });

            function updateIndicatorSize() {
                if (window.innerWidth < 767) {
                    indicator.style.width = '100%';
                    indicator.style.left = '0';
                } else if (activeTab) {
                    moveIndicator(activeTab, indicator);
                }
            }

            function moveIndicator(tab, indicator) {
                indicator.style.width = tab.offsetWidth + 'px';
                indicator.style.left = tab.offsetLeft + 'px';
            }

            updateIndicatorSize();
            window.addEventListener('resize', updateIndicatorSize);
        }
    }
});
// ========================================================================
// Masters Swiper
const MastersGallery = document.querySelector('.gallery-swiper');
if (MastersGallery) {
    const MastersSwiper = new Swiper('.gallery-swiper', {
        direction: 'horizontal',
        loop: false,
        effect: 'slide',
        keyboard: true,
        spaceBetween: 16,
        slidesPerView: 4,

        navigation: {
            nextEl: '.masters__arrow-next',
            prevEl: '.masters__arrow-prev',
        },

        breakpoints: {
            991: {
                spaceBetween: 16,
                slidesPerView: 4,
            },
            767: {
                spaceBetween: 10,
                slidesPerView: 3,
            },
            480: {
                spaceBetween: 10,
                slidesPerView: 2,
            },
            0: {
                spaceBetween: 10,
                slidesPerView: 1,
            },
        }
    });
}
// ========================================================================
// Scroll to A or B
document.addEventListener('DOMContentLoaded', function() {
    const arrowSubheader = document.querySelector('.arrow-subheader');
    if (arrowSubheader) {
        arrowSubheader.addEventListener('click', (e) => {
            e.preventDefault();
            const servicesBlock = document.getElementById('services');
            if (servicesBlock) {
                const targetPosition = servicesBlock.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Sroll Up
    let footerUp = document.querySelector('.footer__up');
    if (footerUp) {
        footerUp.addEventListener('click', (e) => {
            e.preventDefault();
            let subheaderBlock = document.getElementById('subheader');
            if (subheaderBlock) {
                let targetPosition = subheaderBlock.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
});
// ========================================================================
// Floating Button
document.addEventListener('DOMContentLoaded', function() {
    let floMainBtn = document.querySelector('.floating-button__main');
    let floIcons = document.querySelectorAll('.floating-button__social');

    floMainBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        floIcons.forEach((icon) => {
            icon.classList.toggle('flo-active');
        });
    });

    document.addEventListener('click', function(event) {
        let isClickInside = floMainBtn.contains(event.target) || Array.from(floIcons).some(icon => icon.contains(event.target));
        let floCon = document.getElementById('floCon');
        if (!isClickInside) {
            floIcons.forEach((icon) => {
                icon.classList.remove('flo-active');
                floCon.classList.add('vibrating');
            });
        }
    });
});
// ========================================================================
// Floating contacts icons moving stop
document.addEventListener('DOMContentLoaded', function() {
    let floCon = document.getElementById('floCon');

    floCon.addEventListener('click', ()=>{
        floCon.classList.toggle('vibrating');
    })
})
// ========================================================================
// Blur Effect  
document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"]').forEach(function(element) {
    element.addEventListener('focus', function(event) {
        event.target.blur();
    });
});
// ========================================================================
// Modal Menu for Images 
let modalMenu = document.getElementById('modalMenu');
let modalImage = document.getElementById('modalImage');
let modalClose = document.querySelector('.modal-menu__close');
let modalActive = document.querySelectorAll('.modal-active');
let modalFrame = document.getElementById('modalFrame');

modalActive.forEach(img => {
    img.addEventListener('click', function() {
        modalMenu.style.display = 'block';
        modalImage.src = this.src;
    });
});

modalClose.addEventListener('click', function() {
    modalMenu.style.display = 'none';
});

modalMenu.addEventListener('click', function(event) {
    if (event.target === modalFrame) {
        modalMenu.style.display = 'none';
    }
});
// ========================================================================
// Footer Accordeons
document.addEventListener('DOMContentLoaded', function () {
    const accordions = document.querySelectorAll('.top-footer__nav h2');

    accordions.forEach(accordion => {
        accordion.addEventListener('click', function (e) {
            const clickedAccordion = e.target.closest('h2');
            if (!clickedAccordion) return;

            const content = clickedAccordion.nextElementSibling;
            const isOpen = clickedAccordion.classList.contains('_active');

            accordions.forEach(acc => {
                acc.classList.remove('_active');
                acc.nextElementSibling.style.maxHeight = '0';
                acc.nextElementSibling.style.opacity = '0';
                acc.nextElementSibling.style.visibility = 'hidden';
                acc.nextElementSibling.style.padding = '0';
            });

            if (!isOpen) {
                clickedAccordion.classList.add('_active');
                const padding = 30;
                content.style.maxHeight = content.scrollHeight + padding + 'px';
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                content.style.padding = '15px 0';
            }
        });
    });
});
// ========================================================================

