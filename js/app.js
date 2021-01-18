'use strict';

PopulateImage.unicorn = [];
let pagination = 'data/page-1.json';

function PopulateImage(title, url, description, horns, keyword) {
  this.title = title;
  this.image_url = url;
  this.description = description;
  this.horns = horns;
  this.keyword = keyword;
}

PopulateImage.prototype.render = function () {

  const photoTemplate = $('#photo-template').html();
  const $imageRender = $(`<section>${photoTemplate}</section>`);
  $imageRender.addClass(`${this.keyword}`);

  const $h2 = $imageRender.find('h2');
  $h2.text(this.title);

  const $img = $imageRender.find('img');
  $img.attr('src', this.image_url);
  $img.attr('alt', this.title);

  const $p = $imageRender.find('p');
  $p.text(this.description);

  $('main').append($imageRender);
};

function ajaxFunction() {
  $.ajax(pagination).then(pickImage => {
    pickImage.forEach((animal) => {
      PopulateImage.unicorn.push(new PopulateImage(animal.title, animal.image_url, animal.description, animal.horns, animal.keyword));
    });

    // console.log(animal);
    const filterKeyword = [];

    PopulateImage.unicorn.forEach((animal) => {
      if (!filterKeyword.includes(animal.keyword)) {
        const $dropMenu = $(`<option>${animal.keyword}</option>`);
        $dropMenu.attr('value', animal.keyword);
        $('select').append($dropMenu);
        filterKeyword.push(animal.keyword);
      }

      animal.render();

    });
  });
  $('.sort').on('click', (event) => {
    event.preventDefault();
    let sortingBy;
    if ($(event.target).text() === 'Sort Alphabetically') {
      sortingBy = 'title';
    } else {
      sortingBy = 'horns';
    }
    PopulateImage.unicorn.sort((left, right) => {
      $('section').remove();
      if (left[sortingBy] < right[sortingBy]) {
        return -1;
      } else if (left[sortingBy] > right[sortingBy]) {
        return 1;
      } else {
        return 0;
      }
    });
    PopulateImage.unicorn.forEach(animal => animal.render());
  });
}

ajaxFunction();
PopulateImage.populateDrop = () => {
  const filterKeyword = [];

  PopulateImage.unicorn.forEach((animalImg) => {
    filterKeyword.push(animalImg.keyword);
  });
};

$('select').on('change', (event) => {
  event.preventDefault();
  $('section').hide();
  let $userValue = event.target.value;

  $(`section[class = ${$userValue}]`).show();

});

$('.change-page').on('click', (event) => {
  event.preventDefault();
  pagination = pagination === 'data/page-1.json' ? 'data/page-2.json' : 'data/page-1.json';

  $('section').remove();
  $('option').not(':first').remove();
  PopulateImage.unicorn = [];
  ajaxFunction();

});

