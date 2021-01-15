'use strict';

// step 1 make constructor funtion that can make a new instance of object X
// step 2 make a render prototype ( clone  .find  etc) append it to where it belongs on page
// ajax is final step and is where steps 1 and two are combind loop thru json file one loop to use and store function 2 loops one that loops thru json each json object will be new instance second will  our render prototype render
const unicorn = [];

function PopulateImage(title, url, description, horns, keyword) {
  this.title = title;
  this.image_url = url;
  this.description = description;
  this.horns = horns;
  this.keyword = keyword;
}
PopulateImage.prototype.render = function () {
  const $imgClone = $('#photo-template').clone();
  const $img = $imgClone.find('img');
  $imgClone.find('h2').text(this.title);
  $imgClone.attr('id', this.keyword);
  $img.attr('src', this.image_url);
  $img.attr('alt', this.description);
  $imgClone.find('p').text(this.description);
  $('main').append($imgClone);
};



$('button').on('click', event => {

  console.log($(event.target).text());
});

const photoTemplate = $('#photo-template').html();
const $animalRender = $(`<section>${photoTemplate}</section>`);
$animalRender.addClass(`${this.keyword}`);
const $h2 = $animalRender.find('h2');

$h2.text(this.title);



$.ajax('data/page-1.json').then(pickImage => {
  console.log(pickImage);
  const animalArray = [];
  pickImage.forEach(element => {
    unicorn.push(new PopulateImage(element.title, element.image_url, element.description, element.horns, element.keyword));
  });
  unicorn.forEach(animal => {
    animal.render();
    // animal.dropMenu();
  });
  unicorn.forEach(animal => {
    if (!animalArray.includes(animal.keyword)) {
      animalArray.push(animal.keyword);
      const $dropMenuClone = $(`<option value=${animal.keyword}>${animal.keyword}</option>`);
      $('select').append($dropMenuClone);
    }
  });

});

const handleImage = () => {
  $('select').on('change', function () {
    if $(`section.keyword !== #photo-template) {
    $('section').empty();
    // }
    let $userValue = $(this).val();
    // console.log($userValue);

    unicorn.forEach(image => {
      if ($userValue === image.keyword) {
        image.render();

        console.log('Found match' + image.keyword);

        // $(`section[class = ${$userValue}]`).show();
        //dynamically assign a class to section.
      }
    });

  });

};

$(() => {
  handleImage();
});
