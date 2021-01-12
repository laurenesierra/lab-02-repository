'use strict';

const $hornClone = $('li').clone()[0];
console.log($hornClone);

$('ul').append($hornClone);



// $.ajax('data/page-1.json',
//   {
//     success: function (data, status, xhr) {
//       $('p').append(data);
//     }
//   });
