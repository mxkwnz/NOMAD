$(document).ready(function() {
  const carList = [
    "Porsche 911", "BMW M5", "Mercedes G63",
    "Toyota Camry", "Kia Sportage", "Hyundai Tucson",
    "Lexus ES", "Nissan X-Trail", "Audi Q5"
  ];

  $("#carSearch").on("keyup focus", function() {
    const q = $(this).val().toLowerCase().trim();
    const list = $("#autocompleteList").empty();

    if (!q) {
      carList.forEach(c => list.append(`<li class="list-group-item list-group-item-dark">${c}</li>`));
      list.show();
      return;
    }

    const matches = carList.filter(c => c.toLowerCase().includes(q));
    if (matches.length) {
      matches.forEach(c => list.append(`<li class="list-group-item list-group-item-dark">${c}</li>`));
      list.show();
    } else {
      list.append(`<li class="list-group-item list-group-item-dark text-secondary fst-italic">No matches</li>`);
      list.show();
    }
  });

  $(document).on("click", "#autocompleteList li", function() {
    const selected = $(this).text();
    $("#carSearch").val(selected);
    $("#autocompleteList").hide();

    $(".card").hide(); 
    $(".card").each(function() {
      const title = $(this).find(".card-title").text();
      if (title.includes(selected)) {
        $(this).fadeIn(400);
      }
    });
  });

  $(document).click(e => {
    if (!$(e.target).closest("#carSearch,#autocompleteList").length)
      $("#autocompleteList").hide();
  });

  $(".card").on("click", function() {
    $(".card").fadeIn(400); 
    $("#carSearch").val("");
    showToast("Booking", "Returned to full list for booking");
  });


  $(window).on("scroll resize", function() {
    const h = $(document).height() - $(window).height();
    const s = $(window).scrollTop();
    $("#scrollProgress").css("width", (s/h)*100 + "%");
  });


  function spinnerForm(id){
    $(id).on("submit", function(e){
      e.preventDefault();
      const btn = $(this).find("button[type='submit']");
      const old = btn.text();
      btn.prop("disabled", true).html("<span class='spinner-border spinner-border-sm'></span> Sending...");
      setTimeout(()=>{
        btn.prop("disabled", false).text(old);
        showToast("Success","Form submitted!");
        this.reset();
      },1200);
    });
  }
  spinnerForm("#rentForm");
  spinnerForm("#contactForm");

  function showToast(title, msg){
    const toast = $(`
      <div class='toast align-items-center text-bg-dark border border-secondary p-2 mb-2' role='alert' style='min-width:220px'>
        <div class='d-flex justify-content-between'>
          <div><strong>${title}</strong><div class='small text-secondary'>${msg}</div></div>
          <button class='btn-close btn-close-white'></button>
        </div>
      </div>`);
    $("#toastContainer").append(toast);
    setTimeout(()=>toast.fadeOut(400,()=>toast.remove()),2000);
  }
  $(document).on("click",".btn-close",function(){$(this).closest(".toast").remove();});

  $("#copyPhone").on("click",function(){
    const t=$("#officePhone").text();
    navigator.clipboard.writeText(t).then(()=>{
      showToast("Copied","Phone number copied");
      $(this).text("Copied ✓").prop("disabled",true);
      setTimeout(()=>$(this).text("Copy").prop("disabled",false),1500);
    });
  });

  $("img").each(function(){
    const src=$(this).attr("src");
    $(this).attr("data-src",src).removeAttr("src");
  });
  function lazy(){
    $("img[data-src]").each(function(){
      const top=$(this).offset().top;
      if($(window).scrollTop()+$(window).height()+200>top){
        $(this).attr("src",$(this).data("src")).removeAttr("data-src");
      }
    });
  }
  $(window).on("scroll resize",lazy); lazy();
});

  const allCars = [
    { name: 'Porsche 911', price: 120 },
    { name: 'BMW M5', price: 140 },
    { name: 'Mercedes G63', price: 200 },
    { name: 'Toyota Camry', price: 50 },
    { name: 'Kia Sportage', price: 45 },
    { name: 'Hyundai Tucson', price: 48 },
    { name: 'Lexus ES', price: 95 },
    { name: 'Nissan X-Trail', price: 52 },
    { name: 'Audi Q5', price: 110 }
  ];

  $("#filterBtn").on("click", function() {
    const val = parseInt($("#priceInput").val());
    if (isNaN(val) || val <= 0) {
      showToast("Error", "Please enter a valid price.");
      return;
    }

    $("#loadingSpinner").fadeIn(300);
    $(".card").fadeOut(300);

    setTimeout(() => {
      $("#loadingSpinner").fadeOut(300);
      let results = 0;
      $(".card").each(function() {
        const carName = $(this).find(".card-title").text().replace(/\d+\.\s*/, "").trim();
        const car = allCars.find(c => c.name === carName);
        if (car && car.price <= val) {
          $(this).fadeIn(500);
          results++;
        }
      });
      $("#priceInput").val("");
      showToast("Done", "Cars up to $" + val + "/day are shown.");
      
      if (typeof window.auth !== 'undefined') {
        const user = window.auth.getCurrentUser();
        if (user) {
          window.auth.saveSearchHistory(`Price filter: $${val}`, results);
        }
      }
    }, 2000);
  });

  $("#resetBtn").on("click", function() {
    $(".card").fadeIn(500);
    showToast("Reset", "All cars are visible again.");
  });
