<?xml version="1.0" encoding="gb2312"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:UserLayer>
        <sld:LayerFeatureConstraints>
            <sld:FeatureTypeConstraint/>
        </sld:LayerFeatureConstraints>
        <sld:UserStyle>
            <sld:Name>行政区划</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Name>group 0</sld:Name>
                <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
                <sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>

                <sld:Rule>
                       <sld:Name>National level 3</sld:Name>
                       <sld:Title>省[1]</sld:Title>
                       <ogc:Filter>
                          <ogc:PropertyIsEqualTo>
                              <ogc:PropertyName>grade</ogc:PropertyName>
                              <ogc:Literal>1</ogc:Literal>
                          </ogc:PropertyIsEqualTo>
						</ogc:Filter>
					          <sld:MinScaleDenominator>8000000.0</sld:MinScaleDenominator>
                       <sld:MaxScaleDenominator>10000000.0</sld:MaxScaleDenominator>
                       <sld:PolygonSymbolizer>
                                   <sld:Stroke>
                                       <sld:CssParameter name="stroke">#FFAF60</sld:CssParameter>
                                   </sld:Stroke>
                       </sld:PolygonSymbolizer>
                       <sld:TextSymbolizer>
                         			  <sld:Geometry>
                                      <ogc:Function name="centroid">
                                          <ogc:PropertyName>shape</ogc:PropertyName>
                                      </ogc:Function>
                                  </sld:Geometry>
                                  <sld:Label>
                                      <ogc:PropertyName>name</ogc:PropertyName>
                                  </sld:Label>
                                  <sld:Font>
                                      <sld:CssParameter name="font-family">黑体</sld:CssParameter>
                                      <sld:CssParameter name="font-size">18.0</sld:CssParameter>
                                      <sld:CssParameter name="font-style">normal</sld:CssParameter>
                                      <sld:CssParameter name="font-weight">normal</sld:CssParameter>
                                  </sld:Font>
                                  <sld:LabelPlacement>
                                      <sld:PointPlacement>
                                          <sld:AnchorPoint>
                                              <sld:AnchorPointX>0.5</sld:AnchorPointX>
                                              <sld:AnchorPointY>0.5</sld:AnchorPointY>
                                          </sld:AnchorPoint>
                                          <sld:Displacement>
                                              <sld:DisplacementX>0.0</sld:DisplacementX>
                                              <sld:DisplacementY>0.0</sld:DisplacementY>
                                          </sld:Displacement>
                                      </sld:PointPlacement>
                                  </sld:LabelPlacement>
                                  <sld:Halo>
                                      <sld:Radius>1</sld:Radius>
                                      <sld:Fill>
                                          <sld:CssParameter name="fill">#FF9968</sld:CssParameter>
                                      </sld:Fill>
                                  </sld:Halo>
                                  <sld:Fill>
                                      <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                                  </sld:Fill>
                      </sld:TextSymbolizer>
                </sld:Rule>
				
                
                <sld:Rule>
							<sld:Name>shi 3</sld:Name>
							<sld:Title>市[2]</sld:Title>
							<ogc:Filter>
								<ogc:PropertyIsEqualTo>
									<ogc:PropertyName>grade</ogc:PropertyName>
									<ogc:Literal>2</ogc:Literal>
								</ogc:PropertyIsEqualTo>
							</ogc:Filter>
					              <sld:MinScaleDenominator>2000000.0</sld:MinScaleDenominator>
                           <sld:MaxScaleDenominator>8000000.0</sld:MaxScaleDenominator>
					       <sld:PolygonSymbolizer>
								 <sld:Stroke>
									   <sld:CssParameter name="stroke">#FFAF60</sld:CssParameter>
								      <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
								 </sld:Stroke>
							</sld:PolygonSymbolizer>
							<sld:TextSymbolizer>
                      <sld:Geometry>
                         <ogc:Function name="centroid">
                              <ogc:PropertyName>shape</ogc:PropertyName>
                         </ogc:Function>
                      </sld:Geometry>
								<sld:Label>
									<ogc:PropertyName>name</ogc:PropertyName>
								</sld:Label>
								<sld:Font>
									<sld:CssParameter name="font-family">黑体</sld:CssParameter>
									<sld:CssParameter name="font-size">16.0</sld:CssParameter>
									<sld:CssParameter name="font-style">normal</sld:CssParameter>
									<sld:CssParameter name="font-weight">normal</sld:CssParameter>
								</sld:Font>
								<sld:LabelPlacement>
									<sld:PointPlacement>
										<sld:AnchorPoint>
											<sld:AnchorPointX>0.5</sld:AnchorPointX>
											<sld:AnchorPointY>0.5</sld:AnchorPointY>
										</sld:AnchorPoint>
										<sld:Displacement>
											<sld:DisplacementX>0.0</sld:DisplacementX>
											<sld:DisplacementY>0.0</sld:DisplacementY>
										</sld:Displacement>
									</sld:PointPlacement>
								</sld:LabelPlacement>
								<sld:Halo>
									 <sld:Radius>1</sld:Radius>
									 <sld:Fill>
										<sld:CssParameter name="fill">#FF9968</sld:CssParameter>
									 </sld:Fill>
								</sld:Halo>
								<sld:Fill>
								   <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
								</sld:Fill>
					</sld:TextSymbolizer>
                </sld:Rule>
				
                <sld:Rule>
                    <sld:Name>xian 3</sld:Name>
					<sld:Title>县[3]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>grade</ogc:PropertyName>
                            <ogc:Literal>3</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:MinScaleDenominator>100000.0</sld:MinScaleDenominator>
                    <sld:MaxScaleDenominator>2000000.0</sld:MaxScaleDenominator>
					       <sld:PolygonSymbolizer>
								   <sld:Stroke>
                            <sld:CssParameter name="stroke">#FF8040</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">1.5</sld:CssParameter>
                        </sld:Stroke>
                   	</sld:PolygonSymbolizer>
                    <sld:TextSymbolizer>
                      <sld:Geometry>
                         <ogc:Function name="centroid">
                              <ogc:PropertyName>shape</ogc:PropertyName>
                         </ogc:Function>
                      </sld:Geometry>
								<sld:Label>
									<ogc:PropertyName>name</ogc:PropertyName>
								</sld:Label>
								<sld:Font>
									<sld:CssParameter name="font-family">黑体</sld:CssParameter>
									<sld:CssParameter name="font-size">14.0</sld:CssParameter>
									<sld:CssParameter name="font-style">normal</sld:CssParameter>
									<sld:CssParameter name="font-weight">normal</sld:CssParameter>
								</sld:Font>
								<sld:LabelPlacement>
									<sld:PointPlacement>
										<sld:AnchorPoint>
											<sld:AnchorPointX>0.5</sld:AnchorPointX>
											<sld:AnchorPointY>0.5</sld:AnchorPointY>
										</sld:AnchorPoint>
										<sld:Displacement>
											<sld:DisplacementX>0.0</sld:DisplacementX>
											<sld:DisplacementY>0.0</sld:DisplacementY>
										</sld:Displacement>
									</sld:PointPlacement>
								</sld:LabelPlacement>
								<sld:Halo>
									<sld:Radius>1</sld:Radius>
									<sld:Fill>
										<sld:CssParameter name="fill">#FF8040</sld:CssParameter>
									</sld:Fill>
								</sld:Halo>
								<sld:Fill>
									<sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
								</sld:Fill>
					</sld:TextSymbolizer>
				</sld:Rule>
				
                <sld:Rule>
							<sld:Name>jiedao 3</sld:Name>
							<sld:Title>街道[4]</sld:Title>
							<ogc:Filter>
								<ogc:PropertyIsEqualTo>
									<ogc:PropertyName>grade</ogc:PropertyName>
									<ogc:Literal>4</ogc:Literal>
								</ogc:PropertyIsEqualTo>
							</ogc:Filter>
					         <sld:MinScaleDenominator>10000.0</sld:MinScaleDenominator>
							   <sld:MaxScaleDenominator>100000.0</sld:MaxScaleDenominator>
					        <sld:PolygonSymbolizer>
									<sld:Stroke>
										<sld:CssParameter name="stroke">#FF8040</sld:CssParameter>
                           <sld:CssParameter name="stroke-width">1.5</sld:CssParameter>
									</sld:Stroke>
							</sld:PolygonSymbolizer>
							<sld:TextSymbolizer>
                           <sld:Geometry>
                               <ogc:Function name="centroid">
                                    <ogc:PropertyName>shape</ogc:PropertyName>
                               </ogc:Function>
                           </sld:Geometry>
										<sld:Label>
											<ogc:PropertyName>name</ogc:PropertyName>
										</sld:Label>
										<sld:Font>
											<sld:CssParameter name="font-family">黑体</sld:CssParameter>
											<sld:CssParameter name="font-size">14.0</sld:CssParameter>
											<sld:CssParameter name="font-style">normal</sld:CssParameter>
											<sld:CssParameter name="font-weight">normal</sld:CssParameter>
										</sld:Font>
										<sld:LabelPlacement>
											<sld:PointPlacement>
												<sld:AnchorPoint>
													<sld:AnchorPointX>0.5</sld:AnchorPointX>
													<sld:AnchorPointY>0.5</sld:AnchorPointY>
												</sld:AnchorPoint>
												<sld:Displacement>
													<sld:DisplacementX>0.0</sld:DisplacementX>
													<sld:DisplacementY>0.0</sld:DisplacementY>
												</sld:Displacement>
											</sld:PointPlacement>
										</sld:LabelPlacement>
                              		<sld:Halo>
                                      <sld:Radius>1</sld:Radius>
                                      <sld:Fill>
                                          <sld:CssParameter name="fill">#FF8040</sld:CssParameter>
                                      </sld:Fill>
                                  </sld:Halo>
                                  <sld:Fill>
                                      <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                                  </sld:Fill>

							</sld:TextSymbolizer>
				</sld:Rule>
				
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:UserLayer>
</sld:StyledLayerDescriptor>