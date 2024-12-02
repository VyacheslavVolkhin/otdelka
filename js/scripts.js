document.addEventListener("DOMContentLoaded", function() {


	let inputFields = document.querySelectorAll('input[data-mask]');

    inputFields.forEach(function(input) {
        let mask = input.getAttribute('data-mask');
        
        input.addEventListener('input', function() {
            let maskedValue = applyMask(input.value, mask);
            input.value = maskedValue;
        });
    });

    function applyMask(value, mask) {
        let maskedValue = '';
        let valueIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            if (mask[i] === '_') {
                if (value[valueIndex] !== undefined) {
                    maskedValue += value[valueIndex];
                    valueIndex++;
                } else {
                    maskedValue += '_'; // Пустые места заполняются подчеркиванием
                }
            } else {
                maskedValue += mask[i]; // Оставляем разделители
            }
        }

        return maskedValue;
    }

	//select toggle content visibility
	const inputsContent = document.querySelectorAll(
		"input[data-content], input[data-content-check], input[data-content-uncheck]"
	  );
	
	  inputsContent.forEach(function (input) {
		toggleContent(input);
		});
	
	  inputsContent.forEach((input) => {
		input.addEventListener("click", function () {
		  document.querySelectorAll(".frm-content").forEach((content) => {
			content.classList.remove("active");
				});
	
		  inputsContent.forEach(toggleContent);
			});
		});
	
	  document.querySelectorAll(".btn[data-content]").forEach((button) => {
		button.addEventListener("click", function () {
		  let dataContent = this.getAttribute("data-content");
		  this.disabled = true;
		  document
			.querySelectorAll('.frm-content[data-content="' + dataContent + '"]')
			.forEach((content) => {
			  content.classList.add("active");
				});
		  return false;
			});
		});
	
	  function toggleContent(input) {
		let selectContent;
		if (input.checked) {
		  selectContent =
			input.getAttribute("data-content-check") ||
			input.getAttribute("data-content");
			} else {
		  selectContent = input.getAttribute("data-content-uncheck");
			}
		document
		  .querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
		  .forEach((content) => {
			content.classList.add("active");
			});
		}


	//data-maxlength
	let inputs = document.querySelectorAll('.form-input[data-maxlength]');

	inputs.forEach(function(input) {
		input.addEventListener('input', function() {
			let maxLength = parseInt(input.getAttribute('data-maxlength'));
			let count = 0;
			for (let i = 0; i < input.value.length; i++) {
				let char = input.value[i];
				if (char !== '.' && char !== ',') {
					count++;
				}
			}
			if (count > maxLength) {
				let formattedInput = input.value.replace(/[.,]/g, '');
				input.value = formattedInput.substring(0, maxLength);
			}
		});
	});


	//phone mask
	let phoneInputs = document.querySelectorAll('.form-input-phone');

function formatPhoneNumber(input) {
    let cleaned = input.value.replace(/\D/g, '');
    let formatted = '';

    let placeholder = input.getAttribute('placeholder');

    if (placeholder === '(___) ___-__-__') {
        if (cleaned.length >= 1) {
            formatted += '(' + cleaned.substring(0, 3);
        }
        if (cleaned.length > 3) {
            formatted += ') ' + cleaned.substring(3, 6);
        }
        if (cleaned.length > 6) {
            formatted += '-' + cleaned.substring(6, 8);
        }
        if (cleaned.length > 8) {
            formatted += '-' + cleaned.substring(8, 10);
        }
    } else if (placeholder === '+7 (___) ___-__-__') {
        if (cleaned.length >= 1) {
            formatted += '+7 (' + cleaned.substring(0, 3);
        }
        if (cleaned.length > 3) {
            formatted += ') ' + cleaned.substring(3, 6);
        }
        if (cleaned.length > 6) {
            formatted += '-' + cleaned.substring(6, 8);
        }
        if (cleaned.length > 8) {
            formatted += '-' + cleaned.substring(8, 10);
        }
    }

    input.value = formatted;
}

phoneInputs.forEach(function(input) {
    input.addEventListener('input', function() {
        formatPhoneNumber(input);
    });
});


	// filter actions
	const filterButtonOpen = document.querySelector('.js-filter-open');
	const filterButtonClose = document.querySelector('.js-filter-close');
	const filterButtonToggle = document.querySelector('.js-filter-toggle');
	if (filterButtonOpen) {
		filterButtonOpen.addEventListener("click", function(event) {
				document.body.classList.add("filter-show");
				event.preventDefault();
		})
	}
	if (filterButtonClose) {
		filterButtonClose.addEventListener("click", function(event) {
				document.body.classList.remove("filter-show");
				event.preventDefault();
		})
	}
	if (filterButtonToggle) {
		filterButtonToggle.addEventListener("click", function(event) {
				document.body.classList.toggle("filter-show");
				event.preventDefault();
		})
	}



	//catalog items cart add and counter 
	const cartAddButtons = document.querySelectorAll('.js-cart-add');

	cartAddButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			const tileCartWrap = this.closest('.tile-cart-wrap');
			const inputCounter = tileCartWrap.querySelector('.js-input-counter');
			const minusButton = tileCartWrap.querySelector('.js-button-counter-minus');

			tileCartWrap.classList.add('active');
			inputCounter.value = '1';
			
			if (minusButton.classList.contains('button-disabled')) {
				minusButton.classList.remove('button-disabled');
			}
			e.preventDefault()
			return false
		});
	});
	const minusButtons = document.querySelectorAll('.js-button-counter-minus');

	minusButtons.forEach(button => {
		button.addEventListener('click', function() {
			const tileCartWrap = this.closest('.tile-cart-wrap');
			const inputCounter = tileCartWrap.querySelector('.js-input-counter');

			let counterValue = parseInt(inputCounter.value);
			if (counterValue > 0) {
				counterValue--;
				inputCounter.value = counterValue.toString();
			}
			
			if (counterValue === 0) {
				tileCartWrap.classList.remove('active');
			}
		});
	});
	
	
	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	
	
	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//button scroll 
	document.querySelectorAll('.js-anchor').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (!element.closest('.no-close')) {
				element.classList.remove('active')
			}
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav');
	const tabsBlocks = document.querySelectorAll('.js-tab-block');
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title');
	const tabsButtonContent = document.querySelectorAll('.js-tab-content');
	
	function tabsActiveStart() {
		tabsBlocks.forEach(block => {
			block.classList.remove('active');
		});
	
		tabsNav.forEach(nav => {
			let activeButton = nav.querySelector('[data-tab].active');
			
			if (activeButton) {
				let tab = activeButton.dataset.tab;
				let parentTab = activeButton.dataset.tabParent;
				
				tabsBlocks.forEach(block => {
					if (block.dataset.tab === tab && block.dataset.tabParent === parentTab) {
						block.classList.add('active');
					}
				});
			}
		});
	}
	
	tabsButtonTitle.forEach(button => {
		button.addEventListener('click', function(e) {
			this.classList.toggle('active');
			e.preventDefault();
			e.stopPropagation();
			tabsActiveStart();
		});
	});
	
	tabsNav.forEach(nav => {
		nav.addEventListener('click', function(e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active');
				
				if (tabsNavElements) {
					tabsNavElements.classList.remove('active');
				}
				
				e.target.closest('[data-tab]').classList.add('active');
				tabsActiveStart();
				e.preventDefault();
				e.stopPropagation();
			}
		});
	});
	
	tabsActiveStart();



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	//popup-form succefull show
	let callbackForm = document.getElementById('popup-form');
	let popupCallback = document.getElementById('popup-callback');
	let popupSuccess = document.getElementById('popup-form-succefull');
	if (callbackForm) {
		callbackForm.addEventListener('submit', function(event) {
			event.preventDefault();
			popupCallback.classList.remove('active');
			popupSuccess.classList.add('active');
		});
	}

	let oneclickForm = document.getElementById('popup-form-catalog');
	let popupOneclick = document.getElementById('popup-oneclick');
	let popupSuccessCatalog = document.getElementById('popup-form-succefull-catalog');

	if (oneclickForm) {
		oneclickForm.addEventListener('submit', function(event) {
			event.preventDefault();
			popupOneclick.classList.remove('active');
			popupSuccessCatalog.classList.add('active');
		});
	}
	

	//slider designers
	const swiperSliderDesigners = new Swiper('.slider-designers .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-designers-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-designers-prev',
		},
	
	});


	//slider media thumbs preview
	const swiperMediaPreview = new Swiper(".slider-media-thumbs .swiper",
	{
	  loop: false,
	  slidesPerView: 'auto',
	  spaceBetween: 0,
	  threshold: 5,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  freeMode: false,
	  navigation: false,
	  centeredSlides: false,
	  breakpoints: {
			768: {
		  		direction: "vertical",
				  slidesPerView: 4,
				  centeredSlides: false,
			},
		},
	});
	
	//slider media thumbs main
	const swiperMediaMain = new Swiper(".slider-media-main .swiper",
	{
	  loop: false,
	  slidesPerView: 1,
	  spaceBetween: 0,
	  autoHeight: true,
	  speed: 400,
	  threshold: 5,
	  freeMode: false,
	  watchSlidesProgress: true,
	  navigation: false,
	  pagination: {
		clickable: true,
		},
	  thumbs: {
		swiper: swiperMediaPreview,
		},
	});

})
