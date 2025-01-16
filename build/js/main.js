//кнопка бургер
$(document).on('click', '.js-menu-toggler', function() {
  if(!$(this).hasClass('is-active')) {
    $('.page').addClass('is-overflow');
    $(this).addClass('is-active');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
    $('.header__menu').addClass('is-open');
  } else {
    $('.page').removeClass('is-overflow');
    $(this).removeClass('is-active');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#burger_icon');
    $('.header__menu').removeClass('is-open');
  }

  return false;
});

//тогглер секции кластера на мобиле
$(document).on('click', '.js-cluster-item-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).closest('.cluster-item').find('.cluster-item__dropdown').slideDown();
    $(this).addClass('is-active');
  } else {
    $(this).closest('.cluster-item').find('.cluster-item__dropdown').slideUp();
    $(this).removeClass('is-active');
  }
  return false;
});

//аккордион
$(document).on('click', '.accordion__toggler', function () {
  $(this).closest('.accordion').toggleClass('is-open');
  $(this).closest('.accordion').find('.accordion__body').slideToggle();
  return false;
});

function formInit () {
  //кастомный селект
  $('.js-select').each(function() {
    var $p = $(this).closest('.select-wrapper');
    $(this).select2({
      dropdownPosition: 'below',
      dropdownParent: $p,
      minimumResultsForSearch: Infinity
    });
	}).on('select2:open', function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.addClass('open');
	}).on('select2:close', function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.removeClass('open');
	});
}

$(document).on('afterLoad.fb', function( e, instance, slide ) {
    formInit();
});

$(document).ready(function () {
  formInit();
});

//табы этапов в блоке фанансов в кластере
$(document).on('click', '.js-cluster-account-tab-toggler', function () {
  $(this).closest('.tabs-nav').find('.tabs-nav__button').removeClass('is-active');
  $(this).addClass('is-active');

  $(this).closest('.cluster-account').find('.cluster-account__tab').removeClass('is-active');
  $(this).closest('.cluster-account').find('.cluster-account__tab[data-target="'+$(this).attr('data-target')+'"]').addClass('is-active');

  return false;
});
