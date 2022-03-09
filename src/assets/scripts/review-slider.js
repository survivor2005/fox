const reviewBox = document.querySelector('.reviews__list');
const reviewPaginationBox = document.querySelector('.reviews__indicator-box');

const numberOfReviews = reviewBox.childElementCount;


for(let i = 0; i < numberOfReviews; i++) {
    const paginationElem = document.createElement('span');
    paginationElem.classList.add('reviews__indicator');
    reviewPaginationBox.append(paginationElem);
}

$(reviewBox).slick({
    dots: false,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    adaptiveHeight: true,
    pauseOnHover: true
  });

