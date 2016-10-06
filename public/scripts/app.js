angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);


AlbumsIndexController.$inject = ['$http'];
function AlbumsIndexController ($http) {
  var vm = this;
  var albums = [];

  loadAllAlbums();

  function loadAllAlbums() {
    $http({
      method: 'GET',
      url: '/api/albums'
    }).then(function successCallback(response) {
      vm.albums = response.data;
    }, function errorCallback(response) {
      console.log('There was an error getting the data', response);
    });
  };

  vm.createAlbum = function () {
    // console.log(vm.newAlbum.name, vm.newAlbum.artistName);
    $http({
      method: 'POST',
      url: '/api/albums',
      data: {
        name: vm.newAlbum.name,
        artistName: vm.newAlbum.artistName,
        genres: vm.newAlbum.genres
      }
    }).then(function successCallback(response) {
      // console.log(arguments);
      console.log(response.data);
      loadAllAlbums();
      vm.newAlbum = null;
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }


}
