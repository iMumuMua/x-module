xModule.def('modA', ['modB', 'modC'], function(B, C) {
  return B + C;
});