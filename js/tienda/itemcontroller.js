var backendUrl = 'http://micrositios.chailate.com/pop-backend/demo-tienda-back/items.php';
//var backendUrl = 'http://localhost:8888/pop/ropa-backend/items.php';
var app= angular.module('tienda',[]);


app.controller('ItemController',['$scope','$http', '$rootScope', function($scope,$http,$rootScope)
  {
  	$scope.count=0;
  	$scope.numeroItems=0;
  	$scope.opcion=2;
    $scope.url= backendUrl;
    $scope.select="Genero";
    $http.post($scope.url, {"catSexo":$scope.opcion, "seleccionaFiltro":$scope.select}).
     success(function(data, status) 
        {
          $scope.articulos = data;
          $scope.status = status; 
       
        })
     $scope.op=2;

    $scope.url= backendUrl;
    $scope.select="Recientes";
    $http.post($scope.url, {"gender":$scope.op, "seleccionaFiltro":$scope.select}).
     success(function(data, status) 
        {
          $scope.items = data;
          $scope.status = status; 
        })
    $scope.elegirGen = function(event)
      {
        event.preventDefault();
        $scope.select="Recientes";
        $scope.op = $(event.currentTarget).attr("value");
        $http.post($scope.url, {"gender":$scope.op, "seleccionaFiltro":$scope.select}).
        success(function(data, status) 
          {
              $scope.items = data;
              $scope.status = status; 
          })
      };
    $scope.elegirGenero = function(event)
      {
        event.preventDefault();
        $scope.select="Genero";
        $scope.opcion = $(event.currentTarget).attr("value");
        $http.post($scope.url, {"catSexo":$scope.opcion, "seleccionaFiltro":$scope.select}).
        success(function(data, status) 
          {
            $scope.articulos = data;
            $scope.status = status; 
          })
      };
      $scope.elegirRopa = function(event)
      {
        event.preventDefault();
        $scope.select="Ropa";
        $scope.subopcion = $(event.currentTarget).attr("value");
        $http.post($scope.url, {"catSexo":$scope.opcion, "seleccionaFiltro":$scope.select, "subCatClothes":$scope.subopcion}).
        success(function(data, status) 
          {
            $scope.articulos = data;
            $scope.status = status; 
          })
      };
      $scope.elegirTalla = function(event){
      	event.preventDefault();
      	$scope.talla = $(event.currentTarget).attr("value");
      	angular.element(document).find(event).toggleClass('bold');
      	
      };
      $scope.abrirItem = function(event){
      		event.preventDefault();
      		$scope.select = "selectItem";
      		$scope.item = $(event.currentTarget).attr("value");
      		$http.post($scope.url, {"seleccionaFiltro":$scope.select, "item":$scope.item}).
			     success(function(data, status) 
			        {
			          $scope.itemBack = data; 
			          $scope.select= "sumLike";
			          $http.post($scope.url, {"seleccionaFiltro":$scope.select, "idProducto":$scope.item}).
			     		success(function(data, status)
			     		{
			     			
			     		 $scope.suma = data[0].result;
			     		 if($scope.suma == null)
			     		 {
			     		 	$scope.suma = 0;
			     		 }

			     		}) 
			        })
      }
      $scope.carrito = function(event)
      	{	

      		event.preventDefault();
      		$scope.select="Compra";
      		$scope.count = $scope.count + 1;
      		$rootScope.count = $scope.count;
      		if ($scope.count == 1) 
	      		{
	      			if($scope.talla == undefined )
			      		{
			      			alert("No has elegido una talla");
			      			 $http.post($scope.url, {"seleccionaFiltro":$scope.select}).
						     success(function(data, status) 
						        {
						          $rootScope.idUser = data; 

						        })
			      		}
		      		else
			      		{	
			      			$scope.idProducto=  $(event.currentTarget).attr("value");
						    $http.post($scope.url, {"seleccionaFiltro":$scope.select}).
						     success(function(data, status) 
						        {
						          $rootScope.idUser = data;
						           $scope.select= "AddCompra";
								     $http.post($scope.url, {"seleccionaFiltro":$scope.select, "talla":$scope.talla, "idProducto":$scope.idProducto, 'idUsuario':$rootScope.idUser}).
								     success(function(data, status) 
								        {
								          alert(data);
								          $scope.talla = undefined;
								          $scope.select = "ShowCompra";
								          $http.post($scope.url, {"seleccionaFiltro":$scope.select, "idUsuario": $rootScope.idUser}).
								          	success(function(data, status) 
									        {
									         var count = 0;
									        
							        		 for (var i = 0; i < data.length; i++) {
									         	count = count + data[i].precio;

									         }
									         $scope.contar = count;
									         $scope.numeroItems = data.length;
									          $scope.compras = data;
									          $scope.status = status;

									        })
								          
								        })
						        })
			      		}	
	      		}
      		else
      			{
	      			if($scope.talla == undefined )
		      			{ 
		      				alert("No has elegido una talla");
		      			}
	      			else
		      			{	
		      				$scope.idProducto=  $(event.currentTarget).attr("value");
		      			    $scope.select= "AddCompra";
						     $http.post($scope.url, {"seleccionaFiltro":$scope.select, "talla":$scope.talla, "idProducto":$scope.idProducto, 'idUsuario':$rootScope.idUser}).
						     success(function(data, status) 
						        {
						          alert(data);
						          $scope.talla = undefined;
						          $scope.select = "ShowCompra";
						          $http.post($scope.url, {"seleccionaFiltro":$scope.select, "idUsuario": $rootScope.idUser}).
						          	success(function(data, status) 
							        {
					        	   		var count = 0;
							        	for (var i = 0; i < data.length; i++) {
									         	
									         	count = count + data[i].precio;
									         }
									    $scope.contar = count;
							          $scope.compras = data;
							            $scope.numeroItems = data.length;
									   $scope.status = status;

							        })
						        })
						}
      			}
      	}
      $scope.eliminar = function(event)
	    {
			$scope.idProducto=  $(event.currentTarget).attr("value");
			$scope.select = "Delete";
		    $http.post($scope.url, {"seleccionaFiltro":$scope.select, "idProducto" :$scope.idProducto, "idUsuario": $rootScope.idUser}).
		     success(function(data, status) 
		        {
		          $scope.select = "ShowCompra";
		          $http.post($scope.url, {"seleccionaFiltro":$scope.select, "idUsuario": $rootScope.idUser}).
		          	success(function(data, status) 
			        {
	        	   		var count = 0;
			        	for (var i = 0; i < data.length; i++) 
			        		{
					         	count = count + data[i].precio;
					         }
					    $scope.contar = count;
			          $scope.compras = data;
			          $scope.numeroItems = data.length;
					   $scope.status = status;

			        })
		          })
	    }
	     $scope.like = function(event)
	    {
			$scope.idProducto=  $(event.currentTarget).attr("value");
			$scope.select = "like";
		    $http.post($scope.url, {"seleccionaFiltro":$scope.select, "idProducto" :$scope.idProducto}).
		     success(function(data, status) 
		        {
		          alert(data);
			      $scope.select= "sumLike";
			          $http.post($scope.url, {"seleccionaFiltro":$scope.select, "idProducto":$scope.item}).
			     		success(function(data, status)
			     		{
			     			
			     		 $scope.suma = data[0].result;
			     		 if($scope.suma == null)
			     		 {
			     		 	$scope.suma = 0;
			     		 }

			     		}) 
		        })
	    }
	   
      			
  }]);

 angular.module("CombineModule", [ "tienda"]);
