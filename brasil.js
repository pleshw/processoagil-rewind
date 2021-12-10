// Define map size on screen
var width = 596, height = window.innerHeight,
  svg, g, path;

function renderizarEstados(shp, processosPorEstado) {

  // Extracting polygons and contours
  var states = topojson.feature(shp, shp.objects.estados);
  var states_contour = topojson.mesh(shp, shp.objects.estados);

  // Desenhando estados
  g.selectAll(".estado")
    .data(states.features)
    .enter()
    .append("path")
    .attr("class", "state")
    .attr("id", function (d, i) { return 'state' + i; })
    .attr("state-data", function (d) {
      const estado = processosPorEstado.find(c => c.estado === d.properties.nome && c.estado !== undefined);

      if (estado)
        return JSON.stringify(estado);
      else
        return JSON.stringify({
          estado: d.properties.nome,
          total: 0
        });
    })
    .attr("d", path);


  g.append("path")
    .datum(states_contour)
    .attr("d", path)
    .attr("class", "state_contour");



  document.querySelectorAll('.state').forEach(element => {
    const dadosEstado = JSON.parse(element.getAttribute('state-data'));
    if (dadosEstado.total > 0) {
      element.classList.add('tem-processo');
    }

    element.addEventListener('click', () => {
      document.querySelectorAll('use').forEach(el => {
        el.remove();
      });

      if (element.classList.contains('focus')) {
        element.classList.remove('focus');
        return;
      }

      document.querySelectorAll('.state.focus').forEach(el => {
        el.classList.remove('focus');
      });

      element.classList.add('focus');


      document.getElementById('mapaBrasil').insertAdjacentHTML('beforeend',
        `<use xlink:href="#${ element.id }"/>`
      )
    });
  });
}

function loadBrasil(processosPorEstado) {
  svg = d3.select("#mapaBrasil")
    .attr("width", width)
    .attr("height", height);

  var zoom = d3.zoom()
    .scaleExtent([1, 1])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', e => {
      console.log(e)
      d3.select('svg g')
        .attr('transform', e.transform);
    })

  d3.select("#mapaBrasil").call(zoom);

  g = svg.append("g")

  // Align center of Brazil to center of map
  var projection = d3.geoMercator()
    .scale(715)
    .center([-52, -15])
    .translate([width / 2 + 18, height / 2 + 20]);

  path = d3.geoPath().projection(projection);

  d3.json("./br-states.json").then((shp) => {
    renderizarEstados(shp, processosPorEstado)
  });

  d3.select(self.frameElement).style("height", height + "px");
  g.attr("id", "brMap1");
}

