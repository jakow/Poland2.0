module.exports = { 
    scaleImg: function(photoUrl, width) {
    if (typeof(photoUrl) === 'string')
      return photoUrl.replace('upload/', `upload/c_scale,w_${width}/`);
    else
      // throw new Error('[scale img] photoUrl must be string');
      return ''; // fail silently
  }
}
