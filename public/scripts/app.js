/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

console.log("Hello");
angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);
  // ^ the first argument is a string naming the controller,
  // the second argument is a function that defines the capacities
  // of the controller.
AlbumsIndexController.$inject = ['$http'];
function AlbumsIndexController ($http) 
{
  var vm = this;
  vm.albums = [];
  vm.newAlbum = {};

  vm.newAlbum = {
      name: 'Viva Hate',
      artistName: 'Morrissey',
      genres: []
  };

  $http(
  {
    method: 'GET',
    url: '/api/albums',
  }).then(function(response)
  {
    vm.albums = response.data;
  });

  vm.createAlbum = function () 
  {
    //vm.newAlbum.genres = vm.newAlbum.genresAsString.split(',');
  $http(
  {
    method: 'POST',
    url: '/api/albums',
    data: vm.newAlbum
  }).then(function successCallback(response) {
    vm.albums.push(response.data);
  }, function errorCallback(response) {
    console.log('There was an error posting the data', response);
  });

  
  }

  vm.deleteAlbum = function(album)
  {
    console.log('deleting');
    var id = album._id;
    $http(
    {
      method: 'DELETE',
      url: '/api/albums/' + id,
    }).then(function deleteSuccess(response) 
      {
        vm.albums = vm.albums.filter(function(album)
        {
          return album._id != response.data._id;
        });
      }, function errorCallback(response)
        {
          console.log("Error deleting album " + response);
        });
  }

  vm.editAlbum = function(album)
  {
    var id = album._id;
    var data = {
      name: album.name,
      artistName: album.artistName,
      genres: album.genres
    }
    $http( {
      method: 'PUT',
      url: '/api/albums/' + id,
      data: data
    }).then(function editSuccess(response)
      {
        album = response;
      }, function editError(response)
      {
        console.log("Error updating album " + response);
      });
  }
}


