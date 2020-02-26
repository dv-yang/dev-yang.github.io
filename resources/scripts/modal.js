$(document).ready(function() {
	// MODAL
	var modalText = {
		poscoenergy : {
			title : '스마트팩토리 솔루션',
			tag : '발전소 유지관리 시스템',
			detail : '발전소에 운영간 설비의 온도, 진동, 압력등의 데이터를 초당데이터로 관리하고 모니터링하며 나아가 머신러닝을 활용한 예측까지 수행하는 시스템 개발.',
			link : 'http://www.poscoenergy.com'
		},
		gisc : {
			title : '기상청 WMO 세계기상정보센터',
			tag : '기상정보 수집, 공유, 관리 시스템.',
			detail : 'GISC 15개 국가(기상데이터를 수집, 제공하는 15개 국가) 에서 수집하는 기상정보를 암/복호화하여 공유하고 관리하는 시스템 개선.',
			link : 'http://gisc.kma.go.kr'
		},
		innisfree : {
			title : '이니스프리 미국 시스템',
			tag : '이니스프리의 미국 진출 인프라 구성.',
			detail : '이니스프리 미국진출에 필요한 현지 서버 구축과 한국과의 결제 데이터 연동 시스템 개발',
			link : 'https://us.innisfree.com'
		},
		lghnh : {
			title : 'LG생활건강 PLM시스템',
			tag : 'LG생활건강 재고 관리 시스템 개발.',
			detail : 'LG생활건강 유통관리시스템(재고, 입/출고, 품질관리) 시스템 개발.',
			link : 'http://www.lghnh.com'
		},
		encar : {
			title : 'SK엔카 전자결제 시스템',
			tag : 'SK엔카 전자결제 시스템.',
			detail : 'sk엔카 중고차 구매, 판매에 필요한 전자결제 모듈 개발.',
			link : 'http://www.encar.com'
		},
		koroad : {
			title : '도로교통공단',
			tag : '도로교통공단 대외/내부 시스템.',
			detail : '도로교통공단 대외 사이트와 TBN, 내부 관리 시스템 유지보수 관리.',
			link : 'https://www.koroad.or.kr'
		}
	};

	$('#gallery .button').on('click', function() {
		fillModal(this.id);
		$('.modal-wrap').addClass('visible');
	});

	$('.close').on('click', function() {
		$('.modal-wrap, #modal .button').removeClass('visible');
	});

	$('.mask').on('click', function() {
		$('.modal-wrap, #modal .button').removeClass('visible');
	});

	var carousel = $('#carousel'), slideWidth = 700, threshold = slideWidth / 3, dragStart, dragEnd;

	setDimensions();

	$('#next').click(function() {
		shiftSlide(-1);
	});
	$('#prev').click(function() {
		shiftSlide(1);
	});

	carousel.on('mousedown', function() {
		if (carousel.hasClass('transition'))
			return;
		
		dragStart = event.pageX;
		$(this).on('mousemove', function() {
			dragEnd = event.pageX;
			$(this).css('transform', 'translateX(' + dragPos() + 'px)');
		});
		$(document).on('mouseup', function() {
			if (dragPos() > threshold) {
				return shiftSlide(1);
			}
			if (dragPos() < -threshold) {
				return shiftSlide(-1);
			}
			shiftSlide(0);
		});
	});

	function setDimensions() {
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			slideWidth = $(window).innerWidth();
		}
		$('.carousel-wrap, .slide').css('width', slideWidth);
		$('.modal').css('max-width', slideWidth);
		$('#carousel').css('left', slideWidth * -1);
	}

	function dragPos() {
		return dragEnd - dragStart;
	}

	function shiftSlide(direction) {
		if (carousel.hasClass('transition'))
			return;
		
		dragEnd = dragStart;
		$(document).off('mouseup');
		carousel.off('mousemove').addClass('transition').css('transform', 'translateX(' + direction * slideWidth + 'px)');
		setTimeout(function() {
			if (direction === 1) {
				$('.slide:first').before($('.slide:last'));
			} else if (direction === -1) {
				$('.slide:last').after($('.slide:first'));
			}
			carousel.removeClass('transition');
			carousel.css('transform', 'translateX(0px)');
		}, 700);
	}

	function fillModal(id) {
		$('#modal .title').text(modalText[id].title);
		$('#modal .detail').text(modalText[id].detail);
		$('#modal .tag').text(modalText[id].tag);
		if (modalText[id].link)
			$('#modal .button').addClass('visible').parent().attr('href', modalText[id].link);

		$.each($('#modal li'), function(index, value) {
			$(this).text(modalText[id].bullets[index]);
		});
		$.each($('#modal .slide'), function(index, value) {
			$(this).css({
					background : "url('resources/img/slides/" + id + '-' + index + ".jpg') center center/cover",
					backgroundSize : 'cover'
				});
		});
	}
});