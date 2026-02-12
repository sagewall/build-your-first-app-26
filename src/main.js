import { watch } from "@arcgis/core/core/reactiveUtils.js";
import "@arcgis/map-components/components/arcgis-compass";
import "@arcgis/map-components/components/arcgis-feature-table";
import "@arcgis/map-components/components/arcgis-layer-list";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-navigation-toggle";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-zoom";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import "@esri/calcite-components/components/calcite-switch";
import "./style.css";

// Reference to the 2D map view component
const mapViewElement = document.getElementById("map-view");

// Reference to the 3D scene view component
const sceneViewElement = document.getElementById("scene-view");

// Reference to the switch that toggles between map and scene views
const viewSwitch = document.getElementById("view-switch");

// Reference to the layer list component (for toggling and selecting layers)
const layerListElement = document.getElementById("layer-list");

// Reference to the feature table component (for displaying layer attributes)
const featureTable = document.getElementById("feature-table");

// Ensure the layer list component is fully loaded before interacting with it
await layerListElement.componentOnReady();

// Watch for changes to the selected item in the layer list.
watch(
  // Returns the first selected item in the layer list (if any)
  () => layerListElement.selectedItems.getItemAt(0),

  // When the selected item changes, set the feature table's layer to match
  (item) => {
    if (item && item.layer) {
      featureTable.layer = item.layer;
      featureTable.tableTitle = item.layer.title;
    } else {
      featureTable.layer = null;
      featureTable.tableTitle = "Select a layer in the layer list";
    }
  },
);

// Handle toggling between 2D map and 3D scene views when the view switch is changed
viewSwitch.addEventListener("calciteSwitchChange", () => {
  if (viewSwitch.checked) {
    // Switch to 3D scene view
    // Convert the current 2D map viewpoint for 3D
    const viewpoint = convertViewpoint(mapViewElement);
    sceneViewElement.viewpoint = viewpoint;

    // Show the scene view and hide the map view
    mapViewElement.hidden = true;
    sceneViewElement.hidden = false;

    // Update the layer list to reference the scene view
    layerListElement.referenceElement = sceneViewElement;

    // Update the feature table's reference element to the scene view
    featureTable.referenceElement = sceneViewElement;
  } else {
    // Switch to 2D map view
    // Convert the current 3D scene viewpoint for 2D
    const viewpoint = convertViewpoint(sceneViewElement);
    mapViewElement.viewpoint = viewpoint;

    // Show the map view and hide the scene view
    mapViewElement.hidden = false;
    sceneViewElement.hidden = true;

    // Update the layer list's reference element to the map view
    layerListElement.referenceElement = mapViewElement;

    // Update the feature table's reference element to the map view
    featureTable.referenceElement = mapViewElement;
  }
});

// Converts the viewpoint between 2D map and 3D scene views
function convertViewpoint(viewElement) {
  // Clone the current viewpoint to avoid mutating the original
  const viewpoint = viewElement.viewpoint.clone();

  // Get the latitude of the viewpoint's target geometry (in degrees)
  const latitude = viewpoint.targetGeometry.latitude;

  // Calculate the scale adjustment factor for Web Mercator distortion:
  // In 2D maps, scale increases with latitude due to projection.
  // This factor keeps the scale visually consistent when switching views.
  const scaleConversionFactor = Math.cos((latitude * Math.PI) / 180);

  // If switching from 2D map to 3D scene, apply scale correction.
  // If switching from 3D scene to 2D map, reverse the correction.
  if (viewElement.tagName.toLowerCase() === "arcgis-map") {
    viewpoint.scale *= scaleConversionFactor;
  } else if (viewElement.tagName.toLowerCase() === "arcgis-scene") {
    viewpoint.scale /= scaleConversionFactor;
  }

  // Return the adjusted viewpoint
  return viewpoint;
}
