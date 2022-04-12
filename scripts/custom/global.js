
function scrolledCheck(){

  if(window.pageYOffset > 0){
    document.body.classList.add('scrolled');
  }
  else{
    document.body.classList.remove('scrolled');
  }

  if(window.pageYOffset > document.querySelector('.hero').offsetHeight){
    document.body.classList.add('scrolled-pass');
  }
  else{
    document.body.classList.remove('scrolled-pass');
  }

}

if(document.body.dataset.template == 'index'){

  scrolledCheck();

  window.addEventListener('scroll', scrolledCheck);
  window.addEventListener('resize', scrolledCheck);

  const editorialStripeSwiper = new Swiper(".editorial-stripe_carousel", {

    slidesPerView: "auto",
    spaceBetween: 10,

    breakpoints: {
        1200: {
          spaceBetween: 0
        }
    },


    navigation: {
      nextEl: ".editorial-stripe__control--next",
      prevEl: ".editorial-stripe__control--prev",
    }
    
  });


  const featuredCollectionSwiper = new Swiper(".featured-collection__carousel", {

    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    centeredSlidesBounds:true,
    // rewind: true,
    breakpoints: {

        992: {
            slidesPerGroup: 2,
            spaceBetween: 2
        },
        
        1200: {
            slidesPerGroup: 3,
            spaceBetween: 2
        }
    },


    navigation: {
      nextEl: ".featured-collection__control--next",
      prevEl: ".featured-collection__control--prev",
    }
    
  });






document.querySelectorAll('.product-quick-add').forEach(element => {
  element.addEventListener("click", function(e){
    e.preventDefault();
    const quickAddProductTitle = element.dataset.productTitle;
    const quickAddVariantID= element.dataset.variantId;
    const quickAddData = { updates: { [quickAddVariantID] : 1 } };

    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quickAddData)
    })
    .then(response => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      alert(`${quickAddProductTitle} has been added to bag`);
      alert(`Here is the latest Cart Data: ${JSON.stringify(json)}`);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  })
});




}





