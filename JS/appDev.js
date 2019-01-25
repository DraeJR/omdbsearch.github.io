$(document).ready(function(){
    /*---- */ 
    /*-- Step 1 -- */ 
  $("#movies").on("submit", function(e){
    
      
    /*--A--*/ 
    var searchM = $("#search").val();
      
    /*--B--*/   
      console.log(searchM);
      
      /*--D--*/
      /*--From here go to create the function itself and that is step 2 --*/  
      fetchMovies(searchM)
      
    /*--C--*/    
      e.preventDefault();
      /*-- put a this reset--*/  
  }); 
    /*--END STEP 1 --*/ 
    
    
    
/*--STEP 2--*/  
    function fetchMovies(searchM){
        // getting links from //http://www.omdbapi.com/
        //replace square bracket with key
        //then parameters here it's s=
        // + name of inputfield 
        console.log(searchM);
       $("#p").html(searchM);
        // fa9e2bcf
        /*-- a) Ajax call to fetch the API link --*/  
        $.ajax({
            /*-- b) type of request--*/  
            method: "GET",
            /*--c) the link of the service--*/  
            url: "http://www.omdbapi.com/?apikey=fa9e2bcf&s=" + searchM ,
            // view in json viewer
            /* type http://www.omdbapi.com/?apikey=fa9e2bcf&s=  in url but add a name of movie after, then copy paste whatever the url shows into json viewer*/
            /*--d) type of retreived data--*/  
            dataType: "json"
           
            /*--d) the outcome of the whole ajax request--*/  
        }).done(function(data){
            
            console.log(data);
            
            
          if(data.Response == "False") {
              $("#alert").css('display','block');
              
          }
            
           else{
              
               $("#alert").css('display','none');
               
           } 
          
//e? a veriable that stores the json array          //  
            
           
          var arrayOfMovies = data.Search;
          var placeholder= " "; 
  
            
$.each (arrayOfMovies, function(index,movie){
  var id = movie.imdbID;
    console.log(id);
    
     if(movie.Poster == "N/A"){
            console.log("not there");
         
        movie.Poster = "img/poster1.jpg";
     }
    
    
          placeholder +=   `<a onclick="movieDetails('${id}')" > <div class="row d-inline-block"> <div class="container2 m-auto" data-toggle="modal" data-target=".m1">
        <img src="${movie.Poster}" class=" poster m-3">
         <div class="overlay  m-3">
    <div class="text">View Preview</div>
  </div>
                   
    </div></div></a>`;
    $("#mList").html(placeholder);
       
    

    /*
    placeholder += ` <img src="${movie.Poster}" width="90" height="150">`;
    $("#mList").html(placeholder);
    */
    
         
         /*
         placeholder2 += `<img src="img/poster.png" width="90" height="150">`;
    $("#mList").html(placeholder2);
       */
        
    
});
  
    
        //if psoter imaga is "N/A" then use //placeholder 
            /*
        if(movie.Poster == "N/A"){
             placeholder += ` <img src="${movie.Poster}" width="90" height="150">`;
    $("#mList").html(placeholder);
            
        }
        */    
            
        });
        
    };
   /*--END STEP 2  ---*/
    
}); 

//omdb parameters i
function movieDetails(id){
    
    console.log("This is my clicked movie: " + id);
   
    $.ajax({
             
            method: "GET",
           
            url: "http://www.omdbapi.com/?apikey=fa9e2bcf&i=" + id ,
           /* the i is important at the end of that link, it adds the parameter
           http://jsonviewer.stack.hu/
           
           */
            dataType: "json"
           
            /*--d) the outcome of the whole ajax request--*/  
        }).done(function(result){
            console.log(result);
     
        
    var details = " ";
    
     details = `

<div class="row">
<div class="col-lg m-auto p-5 text-center">
<img src="${result.Poster}">
</div>



<div class="col-lg m-auto p-3">
<ul>


    <li><i class="fas fa-film m-2 icon2"></i> <span class="modlist">Title:</span> ${result.Title}</li><br>

     <li><i class="fas fa-star m-2 icon2"></i><span class="modlist">Rating:</span> ${result.Rated}</li><br> 

     <li><i class="fas fa-book m-2 icon2"></i><span class="modlist"> Plot: </span> ${result.Plot}</li><br> 

     <li><i class="fas fa-theater-masks m-2 icon2"></i> <span class="modlist">Actors: </span>${result.Actors}</li><br>

    <li><i class="fas fa-video m-2 icon2 "></i></i> <span class="modlist">Director: </span> ${result.Director}</li><br>

     <li><i class='far fa-calendar-alt m-2 icon'></i> <span class="modlist">Release Date: </span> ${result.Released}</li><br> 

     <li><i class="fas fa-trophy m-2 icon2"></i></i><span class="modlist">Awards: </span>${result.Awards}</li><br> 
        

    </ul>
</div>
</div

`
   
     $("#mDetails").html(details);    
   
    });
    
    
 
/* 
ex: 
grab: Title, Rate, Plot, Actors, Director, Released, Awards, Poster
  
  send it to id mDetails
  result.Director 
  result.imdbID
  
  var details= " "
  details " <ul><li> templat elit </li> "
  
  send the info to mDetails id
*/ 
    
    
    
};




