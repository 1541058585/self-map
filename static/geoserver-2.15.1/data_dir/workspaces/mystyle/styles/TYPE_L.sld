<?xml version="1.0" encoding="gb2312"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml" version="1.0.0">
    <sld:UserLayer>
        <sld:LayerFeatureConstraints>
            <sld:FeatureTypeConstraint/>
        </sld:LayerFeatureConstraints>
        <sld:UserStyle>
            <sld:Name>HLST XZ</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Name>group 0</sld:Name>
                <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
                <sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>
                <sld:SemanticTypeIdentifier>simple</sld:SemanticTypeIdentifier>
                <sld:Rule>
                    <sld:Name>rule01</sld:Name>
                    <sld:Title>耕地[P010]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P010</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#AEF1B0</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule02</sld:Name>
                    <sld:Title>蔬菜种植用地[P020]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P020</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#CDF57A</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule03</sld:Name>
                    <sld:Title>林地[P030]</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>P030</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>G010</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#BBD78D</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              <sld:Rule>
                    <sld:Name>rule03a</sld:Name>
                    <sld:Title>防护绿地[G020]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>G020</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#92dc89</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule04</sld:Name>
                    <sld:Title>工业用地[P061]</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>P061</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>M000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#E7DED0</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule05a</sld:Name>
                    <sld:Title>村民居住用地[P072]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P072</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:MaxScaleDenominator>5000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFFF00</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#808080</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name> rule05b</sld:Name>
                  	 <sld:Title>村民居住用地[P072]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P072</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:MinScaleDenominator>25000.0</sld:MinScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFFF00</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name> rule05c</sld:Name>
                    <sld:Title>村民居住用地[P072]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P072</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:MinScaleDenominator>5000.0</sld:MinScaleDenominator>
                    <sld:MaxScaleDenominator>25000.0</sld:MaxScaleDenominator>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFFF00</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              <sld:Rule>
                    <sld:Name>rule05d</sld:Name>
                    <sld:Title>消防设施用地[U031]</sld:Title>
                    <ogc:Filter>
                        
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U031</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                   
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#8d6ff9</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#4f4af7</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule06</sld:Name>
                    <sld:Title>机关团体用地[P081]</sld:Title>
                    <ogc:Filter>
                        <ogc:Or>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U000</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>P081</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:Or>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FF80FF</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#BB00BB</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              <sld:Rule>
                    <sld:Name>rule06a</sld:Name>
                    <sld:Title>加油加气站用地[B041]</sld:Title>
                    <ogc:Filter>    
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>B041</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFFF99</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#aaaa00</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule07</sld:Name>
                    <sld:Title>科教用地[P083]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P083</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#BC7A7A</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#804040</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule08</sld:Name>
                    <sld:Title>医卫慈善用地[P084]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P084</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#00C5FF</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#0080FF</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule09a</sld:Name>
                    <sld:MinScaleDenominator>10000.0</sld:MinScaleDenominator>
                    <sld:Title>河流水面[P111]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P111</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#73B2FF</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule09b</sld:Name>
                    <sld:MaxScaleDenominator>10000.0</sld:MaxScaleDenominator>
                    <sld:Title>河流水面[P111]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>P111</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#73B2FF</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#0070FF</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule010</sld:Name>
                    <sld:Title>其他非建设用地[E090]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>E090</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#fff4ee</sld:CssParameter>
                        </sld:Fill>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
               <sld:Rule>
                    <sld:Name>rule010a</sld:Name>
                    <sld:Title>物流仓储用地[W000]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>W000</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FF99CC</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#FF77CC</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule011</sld:Name>
                    <sld:Title>交通枢纽用地[S030]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>S030</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#1B9E77</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#008040</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
               <sld:Rule>
                    <sld:Name>rule011a</sld:Name>
                    <sld:Title>其他公用设施用地[U090]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U090</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#CC9999</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#984b4b</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule012</sld:Name>
                    <sld:Title>供水用地[U011]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U011</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#73B2FF</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#0070FF</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              <sld:Rule>
                    <sld:Name>rule012a</sld:Name>
                    <sld:Title>排水设施用地[U021]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U021</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#44d0ff</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#0099CC</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule013</sld:Name>
                    <sld:Title>供电用地[U012]</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                            <ogc:Literal>U012</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FF0000</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#C60000</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>rule014</sld:Name>
                    <sld:Title>供燃气用地[U013]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U013</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#97e8d1</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#24a2a8</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              <sld:Rule>
                    <sld:Name>rule014a</sld:Name>
                    <sld:Title>供热用地[U014]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U014</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FF8000</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#EA4D00</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              <sld:Rule>
                    <sld:Name>rule015</sld:Name>
                    <sld:Title>通信设施用地[U015]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>U015</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e6d99d</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>YangAn001</sld:Name>
                    <sld:Title>行政办公用地[Y001]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>Y001</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FF00FE</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
            	 </sld:Rule>
                <sld:Rule>
                    <sld:Name>YangAn002</sld:Name>
                    <sld:Title>商业服务设施用地[Y002]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>Y002</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FE0000</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>YangAn003</sld:Name>
                    <sld:Title>公用设施用地[Y003]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>Y003</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#0080FF</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>YangAn004</sld:Name>
                    <sld:Title>二类工业用地[Y004]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>Y004</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#B98A5C</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              	 <sld:Rule>
                    <sld:Name>YangAn005</sld:Name>
                    <sld:Title>三类工业用地[Y005]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>Y005</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#965D4A</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>YangAn006</sld:Name>
                    <sld:Title>公园绿地[Y006]</sld:Title>
                    <ogc:Filter>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                <ogc:Literal>Y006</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#00FF01</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
              	 <sld:Rule>
                        <sld:Name>YangAn007</sld:Name>
                        <sld:Title>防护绿地[Y007]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y007</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#019525</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                        <sld:Name>YangAn008</sld:Name>
                        <sld:Title>社会停车场用地[Y008]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y008</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#CBCBCB</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
                  <sld:Rule>
                        <sld:Name>YangAn009</sld:Name>
                        <sld:Title>水域[Y009]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y009</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#01FFFF</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
                  <sld:Rule>
                        <sld:Name>YangAn010</sld:Name>
                        <sld:Title>农林用地[Y010]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y010</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#A5DD6E</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
              		 <sld:Rule>
                   		 <sld:Name>YangAn011</sld:Name>
                       <sld:Title>村落[Y011]</sld:Title>
                   		 <ogc:Filter>
                   		     <ogc:PropertyIsEqualTo>
                   		         <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                   		         <ogc:Literal>Y011</ogc:Literal>
                   		     </ogc:PropertyIsEqualTo>
                   		 </ogc:Filter>
                   		 <sld:PolygonSymbolizer>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#fff4ee</sld:CssParameter>
                   		         <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                   		     </sld:Fill>
                   		     <sld:Stroke>
                   		         <sld:CssParameter name="stroke">#000000</sld:CssParameter>
                   		     </sld:Stroke>
                   		 </sld:PolygonSymbolizer>
                   		 <sld:TextSymbolizer>
                   		     <sld:Label>
                   		         <ogc:PropertyName>NAME</ogc:PropertyName>
                   		     </sld:Label>
                   		     <sld:Font>
                   		         <sld:CssParameter name="font-family">宋体</sld:CssParameter>
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
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#000000</sld:CssParameter>
                   		     </sld:Fill>
                   		 </sld:TextSymbolizer>
                </sld:Rule>
              	 <sld:Rule>
                        <sld:Name>YangAn012</sld:Name>
                        <sld:Title>城镇生活区[Y012]</sld:Title>
                   		<ogc:Filter>
                   		     <ogc:PropertyIsEqualTo>
                   		         <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                   		         <ogc:Literal>Y012</ogc:Literal>
                   		     </ogc:PropertyIsEqualTo>
                   		 </ogc:Filter>
                   		 <sld:PolygonSymbolizer>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#DCE0BE</sld:CssParameter>
                   		         <sld:CssParameter name="fill-opacity">0.95</sld:CssParameter>
                   		     </sld:Fill>
                   		     <sld:Stroke>
                   		         <sld:CssParameter name="stroke">#1B9E77</sld:CssParameter>
                   		     </sld:Stroke>
                   		 </sld:PolygonSymbolizer>
                   		 <sld:TextSymbolizer>
                   		     <sld:Label>
                   		         <ogc:PropertyName>NAME</ogc:PropertyName>
                   		     </sld:Label>
                   		     <sld:Font>
                   		         <sld:CssParameter name="font-family">宋体</sld:CssParameter>
                   		         <sld:CssParameter name="font-size">18.0</sld:CssParameter>
                   		         <sld:CssParameter name="font-style">normal</sld:CssParameter>
                   		         <sld:CssParameter name="font-weight">normal</sld:CssParameter>
                   		     </sld:Font>
                   		     <sld:LabelPlacement>
                   		         <sld:PointPlacement>
                   		             <sld:AnchorPoint>
                   		                 <sld:AnchorPointX>0.5</sld:AnchorPointX>
                   		                 <sld:AnchorPointY>-1</sld:AnchorPointY>
                   		             </sld:AnchorPoint>
                   		             <sld:Displacement>
                   		                 <sld:DisplacementX>0.0</sld:DisplacementX>
                   		                 <sld:DisplacementY>0.0</sld:DisplacementY>
                   		             </sld:Displacement>
                   		         </sld:PointPlacement>
                   		     </sld:LabelPlacement>
                   		     <sld:Fill>
                   		         <sld:CssParameter name="fill">#000000</sld:CssParameter>
                   		     </sld:Fill>
                   		 </sld:TextSymbolizer>
                  </sld:Rule>
				   <sld:Rule>
                        <sld:Name>YangAn013</sld:Name>
                        <sld:Title>二类住宅用地[Y013]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y013</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#FFFF7F</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn014</sld:Name>
                        <sld:Title>商务用地[Y014]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y014</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#FF007F</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn015</sld:Name>
                        <sld:Title>加油加气站用地[Y015]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y015</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#FFBF00</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn016</sld:Name>
                        <sld:Title>供电用地[Y016]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y016</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#0099CC</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn017</sld:Name>
                        <sld:Title>环卫设施用地[Y017]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y017</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#0099CC</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn018</sld:Name>
                        <sld:Title>消防设施用地[Y018]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y018</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#0099CC</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn019</sld:Name>
                        <sld:Title>生态绿地[Y019]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y019</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#0099CC</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn020</sld:Name>
                        <sld:Title>教育科研用地[Y020]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y020</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#CC00CC</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				   <sld:Rule>
                        <sld:Name>YangAn021</sld:Name>
                        <sld:Title>中小学用地[Y021]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y021</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#FF7FFF</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn022</sld:Name>
                        <sld:Title>医疗卫生用地[Y022]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y022</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#FF7F9F</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn023</sld:Name>
                        <sld:Title>物流仓储用地[Y023]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y023</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#9F7FFF</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn024</sld:Name>
                        <sld:Title>军事用地[Y024]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y024</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#99994C</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn025</sld:Name>
                        <sld:Title>二类住宅用地兼容商业服务设施用地[Y025]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y025</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#FF7F00</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn026</sld:Name>
                        <sld:Title>交通场站用地[Y026]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y026</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#003F7F</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn027</sld:Name>
                        <sld:Title>广场用地[Y027]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y027</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#ADADAD</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn028</sld:Name>
                        <sld:Title>服务设施用地[Y028]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y028</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#FF9F7F</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn029</sld:Name>
                        <sld:Title>供水用地[Y029]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y029</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#0099CC</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn030</sld:Name>
                        <sld:Title>供燃气用地[Y030]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y030</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#007FFF</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn031</sld:Name>
                        <sld:Title>排水设施用地[Y031]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y031</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#007299</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
				  <sld:Rule>
                        <sld:Name>YangAn032</sld:Name>
                        <sld:Title>通信设施用地[Y032]</sld:Title>
                        <ogc:Filter>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>TYPE_L</ogc:PropertyName>
                                    <ogc:Literal>Y032</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                        </ogc:Filter>
                        <sld:PolygonSymbolizer>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#0099CC</sld:CssParameter>
                            </sld:Fill>
                            <sld:Stroke>
                                <sld:CssParameter name="stroke">#9d8328</sld:CssParameter>
                            </sld:Stroke>
                        </sld:PolygonSymbolizer>
                  </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:UserLayer>
</sld:StyledLayerDescriptor>