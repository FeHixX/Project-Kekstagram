const EFFECTS = [
  { NAME: 'none', STYLE: 'none', MIN: 0, MAX: 100, STEP: 1, UNIT: '' },
  { NAME: 'chrome', STYLE: 'grayscale', MIN: 0, MAX: 1, STEP: 0.1, UNIT: '' },
  { NAME: 'sepia', STYLE: 'sepia', MIN: 0, MAX: 1, STEP: 0.1, UNIT: '' },
  { NAME: 'marvin', STYLE: 'invert', MIN: 0, MAX: 100, STEP: 1, UNIT: '%' },
  { NAME: 'phobos', STYLE: 'blur', MIN: 0, MAX: 3, STEP: 0.1, UNIT: 'px' },
  { NAME: 'heat', STYLE: 'brightness', MIN: 1, MAX: 3, STEP: 0.1, UNIT: '' }];
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectLevelValue = imgUploadForm.querySelector('.effect-level__value');
const imgUploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imgUploadForm.querySelector('.effects__list');
const effectLevelSlider = imgUploadForm.querySelector('.effect-level__slider');
const defaultEffect = EFFECTS[0];
let currentEffect = defaultEffect;


const isDefault = () => currentEffect === defaultEffect;

const showSlider = () => imgUploadEffectLevel.classList.remove('hidden');

const hideSlider = () => imgUploadEffectLevel.classList.add('hidden');

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: defaultEffect.MIN,
      max: defaultEffect.MAX,
    },
    start: defaultEffect.MAX,
    step: defaultEffect.STEP,
    connect: 'lower'
  });
};

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.MIN,
      max: currentEffect.MAX,
    },
    step: currentEffect.STEP
  });
  effectLevelSlider.noUiSlider.set(currentEffect.MAX);
};

const onEffectsChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    currentEffect = EFFECTS.find((effect) => effect.NAME === evt.target.value);
    imgUploadPreview.className = `effects__preview--${currentEffect.NAME}`;
    updateSlider();
  }
};

const sliderUpdate = () => {
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();
  imgUploadPreview.style.filter = isDefault() ? defaultEffect.STYLE : `${currentEffect.STYLE}(${effectLevelValue.value}${currentEffect.UNIT})`;

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const resetEffect = () => {
  currentEffect = defaultEffect;
  updateSlider();
};

const addEffectListener = () => {
  effectsList.addEventListener('change', onEffectsChange);
  effectLevelSlider.noUiSlider.on('update', sliderUpdate);
};

const deleteEffectListener = () => {
  effectsList.removeEventListener('change', onEffectsChange);
  effectLevelSlider.noUiSlider.destroy();
};

export { addEffectListener, resetEffect, deleteEffectListener, createSlider };
