const RANGE = 0.5;
const PICTURE_COUNT = 10;
const Filter = { DEFAULT: 'filter-default', RANDOM: 'filter-random', DISCUSSED: 'filter-discussed' };
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
const imgFiltersButtons = document.querySelectorAll('.img-filters__button');

const randomSort = () => Math.random() - RANGE;
const discussedSort = (a, b) => {
  if (a.comments === undefined || b.comments === undefined) {
    return null;
  }
  return b.comments.length - a.comments.length;
};

const checkComments = (array) => {
  array.forEach((item) => {
    if (item.comments === undefined) {
      array.push(item);
      array.splice(array.indexOf(item), 1);
    }
  });
  return array;
};

const getWhichFilterChosen = (currentFilter, array) => {
  switch (currentFilter) {
    case Filter.DEFAULT:
      return array;
    case Filter.RANDOM:
      return [...array].sort(randomSort).slice(0, PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...checkComments(array)].sort(discussedSort);
  }
};

const onFilterClick = (array, cb) => {
  imgFilters.classList.remove('img-filters--inactive');

  imgFiltersForm.addEventListener('click', (evt) => {
    imgFiltersButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
    if (evt.target.matches('.img-filters__button')) {
      evt.target.classList.add('img-filters__button--active');
      const currentFilter = evt.target.id;
      cb(getWhichFilterChosen(currentFilter, array));
    }
  });
};

export { onFilterClick };
