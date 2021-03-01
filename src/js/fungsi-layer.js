	var gumasLayer;


			function getKecamatanColor(nama_kec){
				if(nama_kec == "MANUHING"){
					return '#ff0000';
				}else if(nama_kec == "MIHING RAYA"){
					return '#ff0040';
				}else if(nama_kec == "RUNGAN"){
					return '#ff0080';
				}else if(nama_kec == "KURUN"){
					return '#bf00ff';
				}else if(nama_kec == "RUNGAN HULU"){
					return '#4000ff';
				}else if(nama_kec == "MANUHING RAYA"){
					return '#0080ff';
				}else if(nama_kec == "TEWAH"){
					return '#00ffff';
				}else if(nama_kec == "KAHAYAN HULU UTARA"){
					return '#00ff40';
				}else if(nama_kec == "MIRI MANASA"){
					return '#ffff00';
				}else if(nama_kec == "DAMANG BATU"){
					return '#ffbf00';
				}else if(nama_kec == "RUNGAN BARAT"){
					return '#ff4000';
				}else{
					return 'white';
				}
			}
			
			function highlightFeature(e){
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'white',
						fillOpacity : 0.2
					}
				);
				if(!L.Browser.ie && !L.Browser.opera){
					layer.bringToFront();
				}
			}
			
			function resetHighlight(e){

				gumasLayer.resetStyle(e.target);
			}
			
			function tampil(e){
				let kec = e.target;
				gumasLayer.bindPopup(
					`<table nowrap class="table table-bordered">
										<tr style ="line-height: 10px">
											<td nowrap>Nama Kecamatan : </td>
											<td nowrap><b>`+kec.feature.properties.Kecamatan+`<b></td>
											
										</tr>
										<tr style ="line-height: 15px">
											<td nowrap>Ibu Kota Kecamatan : </td>
											<td nowrap>`+kec.feature.properties.ibukota_ke+`</td>
										</tr>
										<tr style ="line-height: 10px">
											<td nowrap>Luas Kecamatan : </td>
											<td nowrap>`+kec.feature.properties.luas_km2+` Km<sup>2</sup</td>
										</tr>
										<tr style ="line-height: 12px">
											<td nowrap>Jumlah Desa : </td>
											<td nowrap>`+kec.feature.properties.jumlah_desa+` Desa</td>
										</tr>
					</table>`
				)

			}
			
			var markers = new Array();
			


			var markerskec = new Array();
			function kecOnEachFeature(feature, layer){
				markers.push(
					L.circleMarker(
						layer.getBounds().getCenter(),
						{
							radius : 0.0,
							opacity : 0,
							fillOpacity : 0
						}
					)
				);
				var markersCount = markers.length;
				markers[markersCount - 1].bindLabel(
					feature.properties.Kecamatan.toString(),
					{
							noHide : true,
							className : 'map-label',
							pane : 'mapPane',
							opacity:0.8,
							direction: 'auto'
							
					}
				);
				markers[markersCount - 1].addTo(map);

				layer.on(
					{
						mouseover : highlightFeature,
						mouseout : resetHighlight,
						click : tampil
					}
				);				
			}		


			

			function gumasStyle(feature){
				return {
					fillColor : getKecamatanColor(feature.properties.Kecamatan),
					weight : 2,
					opacity : 1,
					color : 'white',
					dashArray : 3,
					fillOpacity : 0.7,
				}
			}
		
			var map = L.map('map').setView([-1.1015078,113.8669906], 9);
			
			
			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Sumber Data : Kabupaten Gunung Mas Dalam Angka 2020 - BPS Kabupaten Gunung Mas',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
}).addTo(map);

			gumasLayer = L.geoJson(
				gumas,
				{
					style : gumasStyle,
					onEachFeature : kecOnEachFeature
				}
			).addTo(map);


			
			var visible;
			map.on(
				'zoomend',
				function(e){
					if(map.getZoom() > 8){
						if(!visible){
							for(var i = 0; i < markers.length; i++){
								markers[i].showLabel();
							}
							visible = true;
						}
					}else{
						if(visible){
							for(var i = 0; i < markers.length; i++){
								markers[i].hideLabel();
							}
							visible = false;
						}
					}
				}
			
			);