// Define map size on screen
let width = 596, height = window.innerHeight,
  fullMapSvg, fullMapGPath, fullMapPath, selectedStateSvg, selectedStateGPath, selectedStatePath;


function renderizarMinimapa(shp) {
  selectedStateSvg = d3.select("#estadoSelecionado")
    .attr("width", 400)
    .attr("height", 400);


  const zoom = d3.zoom()
    .scaleExtent([1, 1])
    .translateExtent([[0, 0], [400, 400]])
    .on('zoom', e => {
      console.log(e)
      d3.select('svg g')
        .attr('transform', e.transform);
    })

  d3.select("#estadoSelecionado").call(zoom);

  selectedStateGPath = selectedStateSvg.append("g")

  // Align center of Brazil to center of map
  const projection = d3.geoMercator()
    .scale(480)
    .center([-42, -26])
    .translate([width / 2, height / 2]);

  selectedStatePath = d3.geoPath().projection(projection);

  renderizarEstadoSelecionado(shp);

  d3.select(self.frameElement).style("height", 400 + "px");
  selectedStateGPath.attr("id", "selectedStateElement");
}

function renderizarEstadoSelecionado(shp, idEstadoSelecionado) {
  const states = topojson.feature(shp, shp.objects.estados).features.filter(s => s.id == idEstadoSelecionado);

  if (states.length)
    selectedStateGPath
      .selectAll(".estado")
      .data(states)
      .enter()
      .append("path")
      .attr("class", "state")
      .attr("id", function (d, i) { return 'selectedState' + i; })
      .attr("d", selectedStatePath);
}

function renderizarEstados(shp, processosPorEstado) {
  // Extraindo polygons e contours
  const states = topojson.feature(shp, shp.objects.estados);
  const states_contour = topojson.mesh(shp, shp.objects.estados);

  // Desenhando estados
  fullMapGPath
    .selectAll(".estado")
    .data(states.features)
    .enter()
    .append("path")
    .attr("data-bs-toggle", "tooltip")
    .attr("class", "state")
    .attr("data-bs-html", "true")
    .attr("data-bs-placement", "top")
    .attr("title", function (d) {
      const estado = processosPorEstado.find(c => c.estado === d.properties.nome && c.estado !== undefined);

      if (estado)
        return `<u>${ d.properties.nome }</u> </br> <em>Encontramos</em> <b>${ estado.total }</b> processos`
      else
        return ``
    })
    .attr("id", function (d, i) { return 'state' + i; })
    .attr("state-data", function (d) {
      const estado = processosPorEstado.find(c => c.estado === d.properties.nome && c.estado !== undefined);

      if (estado)
        return JSON.stringify({
          ...estado,
          id: d.id
        });
      else
        return JSON.stringify({
          id: d.id,
          estado: d.properties.nome,
          total: 0
        });
    })
    .attr("d", fullMapPath);


  fullMapGPath
    .append("path")
    .datum(states_contour)
    .attr("d", fullMapPath)
    .attr("class", "state_contour");

  document.querySelectorAll('.state').forEach(element => {
    const dadosEstado = JSON.parse(element.getAttribute('state-data'));

    if (dadosEstado.total > 0) {
      element.classList.add('tem-processo');
    }

    element.addEventListener('click', () => {
      ///renderizarEstadoSelecionado(shp, dadosEstado.id)

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
  fullMapSvg = d3.select("#mapaBrasil")
    .attr("width", width)
    .attr("height", height);

  const zoom = d3.zoom()
    .scaleExtent([1, 1])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', e => {
      console.log(e)
      d3.select('svg g')
        .attr('transform', e.transform);
    })

  d3.select("#mapaBrasil").call(zoom);

  fullMapGPath = fullMapSvg.append("g")

  // Align center of Brazil to center of map
  const projection = d3.geoMercator()
    .scale(815)
    .center([-52, -15])
    .translate([width / 2 + 18, height / 2]);

  fullMapPath = d3.geoPath().projection(projection);

  d3.json("./br-states.json").then((shp) => {
    renderizarEstados(shp, processosPorEstado)
    // renderizarMinimapa(shp);
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  });

  d3.select(self.frameElement).style("height", height + "px");
  fullMapGPath.attr("id", "brMap1");
}

