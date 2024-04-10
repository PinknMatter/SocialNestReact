import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function MyComponent() {
  const svgRef = useRef();
  console.log("call2");
  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 8])
    .on("zoom", (event) =>
      d3.select(svgRef.current).select("g").attr("transform", event.transform)
    );

  // Function to programmatically zoom to a node
  const zoomToNode = (node) => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const x = node.x;
    const y = node.y;
    const scale = 3; // Adjust scale as needed
    const translate = [width / 2 - scale * x, height / 2 - scale * y];

    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      );
  };

  useEffect(() => {
    // Fetch and process the graph data
    const fetchData = async () => {
      const response = await fetch("/api/graphData");
      const rawData = await response.json();

      // Processing logic here...
      let nodesMap = new Map();
      let links = [];
      let normalizedNodesMap = new Map(); // For deduplication based on normalized names

      const normalizeName = (node) => {
        // Trim spaces and convert to lowercase for both first and last names
        const firstName = node.properties["First Name"].trim().toLowerCase();
        const lastName = node.properties["Last Name"].trim().toLowerCase();
        return `${firstName} ${lastName}`;
      };

      rawData.result.records.forEach((record) => {
        let [sourceNode, , targetNode] = record._fields;

        [sourceNode, targetNode].forEach((node) => {
          const nodeId = node.identity.low;
          const nodeName = normalizeName(node);

          if (!normalizedNodesMap.has(nodeName)) {
            nodesMap.set(nodeId, {
              id: nodeId,
              ...node.properties,
              name: nodeName, // Store normalized name for display or further processing
            });
            normalizedNodesMap.set(nodeName, nodeId); // Map normalized name to node ID
          }
        });
      });

      rawData.result.records.forEach((record) => {
        let [sourceNode, relationship, targetNode] = record._fields;

        const sourceId = normalizedNodesMap.get(normalizeName(sourceNode));
        const targetId = normalizedNodesMap.get(normalizeName(targetNode));

        links.push({
          source: sourceId,
          target: targetId,
          type: relationship.type,
        });
      });

      let nodes = Array.from(nodesMap.values());

      // Add random positions to nodes
      // nodes.forEach((node) => {
      //   node.x = Math.random() * (960 - 2 * 25) + 25;
      //   node.y = Math.random() * (600 - 2 * 25) + 25;
      // });

      return { nodes, links };
    };

    fetchData().then((graph) => {
      d3.select(svgRef.current).selectAll("*").remove();
      console.log("call");

      const svg = d3.select(svgRef.current).call(zoom);
      svg.attr("width", 960).attr("height", 960).style("cursor", "move");

      // If not, create it and attach to ref

      const container = svg.append("g");

      const simulation = d3
        .forceSimulation(graph.nodes)
        .force(
          "link",
          d3
            .forceLink(graph.links)
            .id((d) => d.id)
            .distance(190)
        ) // Try increasing the distance
        .force("charge", d3.forceManyBody().strength(-200)) // Try making the charge more negative
        .force("center", d3.forceCenter(960 / 2, 600 / 2));

      for (let i = 0; i < 100; i++) {
        simulation.tick();
      }

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        nodeOuter.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

        nodeInner
          .attr("cx", (d) => d.x) // Ensure inner circle follows the outer circle's position
          .attr("cy", (d) => d.y);

        text.attr("x", (d) => d.x).attr("y", (d) => d.y - 10);
      });

      const defs = svg.append("defs");

      document
        .getElementById("searchButton")
        .addEventListener("click", function () {
          const searchValue = document
            .getElementById("searchInput")
            .value.trim()
            .toLowerCase();
          const node = graph.nodes.find(
            (d) => d.name.toLowerCase() === searchValue
          );
          if (node) {
            zoomToNode(node);
          } else {
            console.error("Node not found");
          }
        });

      const filter = defs
        .append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "300%"); // Make the filter region larger than the element.

      // Define the drop shadow effect
      filter
        .append("feDropShadow")
        .attr("dx", 1) // Offset in X direction
        .attr("dy", 7) // Offset in Y direction
        .attr("stdDeviation", 4) // Blur amount
        .attr("flood-opacity", 0.2) // Shadow opacity
        .attr("flood-color", "black"); // Shadow color

      const link = container
        .selectAll(".link")
        .data(graph.links)
        .enter()
        .append("line")
        .style("stroke", (d) => (d.type === "Family" ? "green" : "#999"))
        .style("stroke-width", 0.5);

      const nodeOuter = container
        .selectAll(".node-outer")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("class", "node-outer")
        .attr("r", 20) // Radius of the outer circle
        .style("fill", "#E6E6E6") // Fill color of the outer circle
        .style("stroke", "#999999")
        .style("stroke-width", "0.5px")
        .call(drag(simulation));

      // Append smaller inner circles
      const nodeInner = container
        .selectAll(".node-inner")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("class", "node-inner")
        .attr("r", 15) // Radius of the inner circle, smaller than the outer circle
        .style("fill", "#F2F2F2") // Different fill color to distinguish
        .style("stroke", "#999999")
        .style("stroke-width", "0.5px")
        .attr("cx", (d) => d.x) // Initial x-position, aligned with the outer circle
        .attr("cy", (d) => d.y)
        .style("filter", "url(#drop-shadow)") // Apply the drop shadow filter

        .call(drag(simulation)); // Apply the drag behavior

      const text = container
        .append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(graph.nodes)
        .join("text")
        .text((d) => `${d["First Name"]} ${d["Last Name"]}`) // Adjust this based on your data
        .attr("x", (d) => d.x)
        .style("text-anchor", "middle")
        .style("fill", "#555")
        .style("font-family", "Arial")
        .style("font-size", 12)
        .style("z-index", 1000)
        .attr("transform", "translate(0, -20)");

      nodeOuter.append("title").text((d) => d.name);

      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;

          // Update positions of both inner and outer circles directly
          d3.selectAll(".node-outer")
            .filter((dd) => dd === d)
            .attr("cx", d.x)
            .attr("cy", d.y);

          d3.selectAll(".node-inner")
            .filter((dd) => dd === d)
            .attr("cx", d.x)
            .attr("cy", d.y);
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }
    });
  }, []);

  return (
    <div>
      <input type="text" id="searchInput" placeholder="Search for a node..." />
      <button id="searchButton">Search</button>
      <svg ref={svgRef}></svg>{" "}
    </div>
  );
}

export default MyComponent;
