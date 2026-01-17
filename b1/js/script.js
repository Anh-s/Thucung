function show(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  
  // Chart doanh thu
  new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
      labels: ['T2','T3','T4','T5','T6','T7'],
      datasets: [{
        label: 'Doanh thu',
        data: [3,5,4,6,7,9],
        borderColor: '#6BBEF2',
        fill: false
      }]
    }
  });
  
  // Chart dịch vụ
  new Chart(document.getElementById('serviceChart'), {
    type: 'doughnut',
    data: {
      labels: ['Tắm','Grooming','Spa'],
      datasets: [{
        data: [40,35,25],
        backgroundColor: ['#BADFF3','#9ED3F0','#6BBEF2']
      }]
    }
  });
  
  const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {
  link.addEventListener("click", function () {
    menuLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

