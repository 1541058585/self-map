<?xml version="1.0" encoding="gb2312"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:UserLayer>
        <sld:LayerFeatureConstraints>
            <sld:FeatureTypeConstraint/>
        </sld:LayerFeatureConstraints>
        <sld:UserStyle>
            <sld:Name>城市AQI</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Name>group 0</sld:Name>
                <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
                <sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>

                <sld:Rule>
                       <sld:Name>优[0-50]</sld:Name>
                       <sld:Title>优[0-50]</sld:Title>
                       <ogc:Filter>
						   <ogc:PropertyIsBetween>
							  <ogc:PropertyName>aqi</ogc:PropertyName>
							  <ogc:LowerBoundary>
								<ogc:Literal>0</ogc:Literal>
							  </ogc:LowerBoundary>
							  <ogc:UpperBoundary>
								<ogc:Literal>50</ogc:Literal>
							  </ogc:UpperBoundary>
							</ogc:PropertyIsBetween>
						</ogc:Filter>
                       <sld:PolygonSymbolizer>
                                   <sld:Stroke>
                                       <sld:CssParameter name="stroke">#4A4AFF</sld:CssParameter>
									   <sld:CssParameter name="stroke-width">0.2</sld:CssParameter>
                                   </sld:Stroke>
								   <sld:Fill>
										<sld:CssParameter name="fill">#2BCF29</sld:CssParameter>
										<sld:CssParameter name="fill-opacity">1</sld:CssParameter>
								   </sld:Fill> 
                       </sld:PolygonSymbolizer>
                       <sld:TextSymbolizer>
								  <sld:Geometry>
									  <ogc:Function name="centroid">
											  <ogc:PropertyName>shape</ogc:PropertyName>
									  </ogc:Function>
                                  </sld:Geometry>
                                  <sld:Label>
                                      <ogc:PropertyName>aqi</ogc:PropertyName>
                                  </sld:Label>
                                  <sld:Font>
                                      <sld:CssParameter name="font-family">黑体</sld:CssParameter>
                                      <sld:CssParameter name="font-size">12.0</sld:CssParameter>
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
                                          <sld:CssParameter name="fill">#5959FF</sld:CssParameter>
                                      </sld:Fill>
                                  </sld:Halo>
                                  <sld:Fill>
                                      <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                                  </sld:Fill>
                      </sld:TextSymbolizer>
                </sld:Rule>
				
                
                <sld:Rule>
					   <sld:Name>良好[51-100]</sld:Name>
                       <sld:Title>良好[51-100]</sld:Title>
                       <ogc:Filter>
						   <ogc:PropertyIsBetween>
							  <ogc:PropertyName>aqi</ogc:PropertyName>
							  <ogc:LowerBoundary>
								<ogc:Literal>51</ogc:Literal>
							  </ogc:LowerBoundary>
							  <ogc:UpperBoundary>
								<ogc:Literal>100</ogc:Literal>
							  </ogc:UpperBoundary>
							</ogc:PropertyIsBetween>
						</ogc:Filter>
                       <sld:PolygonSymbolizer>
                                   <sld:Stroke>
									   <sld:CssParameter name="stroke">#4A4AFF</sld:CssParameter>
								       <sld:CssParameter name="stroke-width">0.2</sld:CssParameter>
								   </sld:Stroke>
								   <sld:Fill>
										<sld:CssParameter name="fill">#ffd202</sld:CssParameter>
										<sld:CssParameter name="fill-opacity">1</sld:CssParameter>
								   </sld:Fill> 
                       </sld:PolygonSymbolizer>
					  <sld:TextSymbolizer>
								  <sld:Geometry>
									 <ogc:Function name="centroid">
										  <ogc:PropertyName>shape</ogc:PropertyName>
									 </ogc:Function>
								  </sld:Geometry>
								<sld:Label>
									<ogc:PropertyName>aqi</ogc:PropertyName>
								</sld:Label>
								<sld:Font>
									<sld:CssParameter name="font-family">黑体</sld:CssParameter>
									<sld:CssParameter name="font-size">12.0</sld:CssParameter>
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
										<sld:CssParameter name="fill">#5959FF</sld:CssParameter>
									 </sld:Fill>
								</sld:Halo>
								<sld:Fill>
								   <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
								</sld:Fill>
					</sld:TextSymbolizer>
                </sld:Rule>
				
                <sld:Rule>
					   <sld:Name>轻度[101-150]</sld:Name>
                       <sld:Title>轻度[101-150]</sld:Title>
                       <ogc:Filter>
						   <ogc:PropertyIsBetween>
							  <ogc:PropertyName>aqi</ogc:PropertyName>
							  <ogc:LowerBoundary>
								<ogc:Literal>101</ogc:Literal>
							  </ogc:LowerBoundary>
							  <ogc:UpperBoundary>
								<ogc:Literal>150</ogc:Literal>
							  </ogc:UpperBoundary>
							</ogc:PropertyIsBetween>
						</ogc:Filter>
                       <sld:PolygonSymbolizer>
                                   <sld:Stroke>
										<sld:CssParameter name="stroke">#0000FF</sld:CssParameter>
										<sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
								   </sld:Stroke>
								   <sld:Fill>
										<sld:CssParameter name="fill">#FF7805</sld:CssParameter>
										<sld:CssParameter name="fill-opacity">1</sld:CssParameter>
								   </sld:Fill> 
                       </sld:PolygonSymbolizer>
					  <sld:TextSymbolizer>
							  <sld:Geometry>
								 <ogc:Function name="centroid">
									  <ogc:PropertyName>shape</ogc:PropertyName>
								 </ogc:Function>
							  </sld:Geometry>
								<sld:Label>
									<ogc:PropertyName>aqi</ogc:PropertyName>
								</sld:Label>
								<sld:Font>
									<sld:CssParameter name="font-family">黑体</sld:CssParameter>
									<sld:CssParameter name="font-size">12.0</sld:CssParameter>
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
										<sld:CssParameter name="fill">#5959FF</sld:CssParameter>
									</sld:Fill>
								</sld:Halo>
								<sld:Fill>
									<sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
								</sld:Fill>
					</sld:TextSymbolizer>
				</sld:Rule>
				
                <sld:Rule>
					   <sld:Name>中度[151-200]</sld:Name>
                       <sld:Title>中度[151-200]</sld:Title>
                       <ogc:Filter>
						   <ogc:PropertyIsBetween>
							  <ogc:PropertyName>aqi</ogc:PropertyName>
							  <ogc:LowerBoundary>
								<ogc:Literal>151</ogc:Literal>
							  </ogc:LowerBoundary>
							  <ogc:UpperBoundary>
								<ogc:Literal>200</ogc:Literal>
							  </ogc:UpperBoundary>
							</ogc:PropertyIsBetween>
						</ogc:Filter>
                       <sld:PolygonSymbolizer>
                                   	<sld:Stroke>
										<sld:CssParameter name="stroke">#0000FF</sld:CssParameter>
										<sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
									</sld:Stroke>
								   <sld:Fill>
										<sld:CssParameter name="fill">#FF4A49</sld:CssParameter>
										<sld:CssParameter name="fill-opacity">1</sld:CssParameter>
								   </sld:Fill> 
                       </sld:PolygonSymbolizer>
					  <sld:TextSymbolizer>
                           <sld:Geometry>
                               <ogc:Function name="centroid">
                                    <ogc:PropertyName>shape</ogc:PropertyName>
                               </ogc:Function>
                           </sld:Geometry>
										<sld:Label>
											<ogc:PropertyName>aqi</ogc:PropertyName>
										</sld:Label>
										<sld:Font>
											<sld:CssParameter name="font-family">黑体</sld:CssParameter>
											<sld:CssParameter name="font-size">12.0</sld:CssParameter>
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
                                          <sld:CssParameter name="fill">#0000AA</sld:CssParameter>
                                      </sld:Fill>
                                  </sld:Halo>
                                  <sld:Fill>
                                      <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                                  </sld:Fill>

							</sld:TextSymbolizer>
				</sld:Rule>
				
				<sld:Rule>
					   <sld:Name>重度[201-300]</sld:Name>
                       <sld:Title>重度[201-300]</sld:Title>
                       <ogc:Filter>
						   <ogc:PropertyIsBetween>
							  <ogc:PropertyName>aqi</ogc:PropertyName>
							  <ogc:LowerBoundary>
								<ogc:Literal>201</ogc:Literal>
							  </ogc:LowerBoundary>
							  <ogc:UpperBoundary>
								<ogc:Literal>300</ogc:Literal>
							  </ogc:UpperBoundary>
							</ogc:PropertyIsBetween>
						</ogc:Filter>
                       <sld:PolygonSymbolizer>
                                   	<sld:Stroke>
										<sld:CssParameter name="stroke">#0000FF</sld:CssParameter>
										<sld:CssParameter name="stroke-width">1.5</sld:CssParameter>
									</sld:Stroke>
								   <sld:Fill>
										<sld:CssParameter name="fill">#9E004F</sld:CssParameter>
										<sld:CssParameter name="fill-opacity">1</sld:CssParameter>
								   </sld:Fill> 
                       </sld:PolygonSymbolizer>
					  <sld:TextSymbolizer>
                           <sld:Geometry>
                               <ogc:Function name="centroid">
                                    <ogc:PropertyName>shape</ogc:PropertyName>
                               </ogc:Function>
                           </sld:Geometry>
										<sld:Label>
											<ogc:PropertyName>aqi</ogc:PropertyName>
										</sld:Label>
										<sld:Font>
											<sld:CssParameter name="font-family">黑体</sld:CssParameter>
											<sld:CssParameter name="font-size">12.0</sld:CssParameter>
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
                                          <sld:CssParameter name="fill">#0000AA</sld:CssParameter>
                                      </sld:Fill>
                                  </sld:Halo>
                                  <sld:Fill>
                                      <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                                  </sld:Fill>

							</sld:TextSymbolizer>
				</sld:Rule>
				
				<sld:Rule>
					   <sld:Name>严重[301-500]</sld:Name>
                       <sld:Title>严重[301-500]</sld:Title>
                       <ogc:Filter>
							 <ogc:PropertyIsBetween>
							  <ogc:PropertyName>aqi</ogc:PropertyName>
							  <ogc:LowerBoundary>
								<ogc:Literal>301</ogc:Literal>
							  </ogc:LowerBoundary>
							  <ogc:UpperBoundary>
								<ogc:Literal>500</ogc:Literal>
							  </ogc:UpperBoundary>
							</ogc:PropertyIsBetween>
						</ogc:Filter>
                       <sld:PolygonSymbolizer>
                                   	<sld:Stroke>
										<sld:CssParameter name="stroke">#0000FF</sld:CssParameter>
										<sld:CssParameter name="stroke-width">1.8</sld:CssParameter>
									</sld:Stroke>
								   <sld:Fill>
										<sld:CssParameter name="fill">#790222</sld:CssParameter>
										<sld:CssParameter name="fill-opacity">1</sld:CssParameter>
								   </sld:Fill> 
                       </sld:PolygonSymbolizer>
					  <sld:TextSymbolizer>
                           <sld:Geometry>
                               <ogc:Function name="centroid">
                                    <ogc:PropertyName>shape</ogc:PropertyName>
                               </ogc:Function>
                           </sld:Geometry>
										<sld:Label>
											<ogc:PropertyName>aqi</ogc:PropertyName>
										</sld:Label>
										<sld:Font>
											<sld:CssParameter name="font-family">黑体</sld:CssParameter>
											<sld:CssParameter name="font-size">12.0</sld:CssParameter>
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
                                          <sld:CssParameter name="fill">#0000AA</sld:CssParameter>
                                      </sld:Fill>
                                  </sld:Halo>
                                  <sld:Fill>
                                      <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                                  </sld:Fill>

							</sld:TextSymbolizer>
				</sld:Rule>
				<sld:Rule>
					   <sld:Name>没有污染</sld:Name>
                       <sld:Title>没有污染</sld:Title>
                       <ogc:Filter>
							  <ogc:PropertyName>aqi</ogc:PropertyName>
							  <ogc:Literal>null</ogc:Literal>
						</ogc:Filter>
                       <sld:PolygonSymbolizer>
                                   	<sld:Stroke>
										<sld:CssParameter name="stroke">#0000FF</sld:CssParameter>
									</sld:Stroke>
                       </sld:PolygonSymbolizer>
					  <sld:TextSymbolizer>
                           <sld:Geometry>
                               <ogc:Function name="centroid">
                                    <ogc:PropertyName>shape</ogc:PropertyName>
                               </ogc:Function>
                           </sld:Geometry>
										<sld:Label>
											<ogc:PropertyName>aqi</ogc:PropertyName>
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
                                          <sld:CssParameter name="fill">#0000AA</sld:CssParameter>
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