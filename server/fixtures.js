var onurId;
var bdc2015Id;
var bdc2013Id;
var bdc2018Id;
var femId;



var now = new Date().getTime();

// create  users
/*onurId = Meteor.users.insert({
     profile: { first_name: 'Mohamed', last_name: 'Majdoub', components: [ {componentId: 'BDC2013', cafBlocks : ["AirConditioning", "PfLinSteeringWheel"]  }, {componentId: 'BDC2013', cafBlocks : ["AirConditioning", "PfLinSteeringWheel"]  }]}
   }); */


if(Components.find().count() === 0){

  bdc2015Id = Components.insert({
    _id : 'BDC2015',
    subcribers: [ ],
    brv: [
      {
        name: 'G001',
        derivates : [ {name : 'G001'}, { name: 'G002'}]
      },
      {
        name: 'G008',
        derivates : [ {name : 'G008'} ]
      },
      {
        name: 'G038',
        derivates : [ {name : 'G038'} ]
      },
      {
        name: 'G030',
        derivates : [ {name : 'G030'}, {name : 'G031'}, {name : 'G032'}]
      },
      {
        name: 'G011',
        derivates : [ {name : 'G011'}, {name : 'G012'}, {name : 'G013'}]
      },
      {
        name: 'RR11',
        derivates : [ {name : 'RR11'}, {name : 'RR12'}, {name : 'RR13'}]
      }
    ],
    caf_blocks : [
      {
        _id:'AirConditioning',
        subscribers: [],
      },
      {
        _id:'PfLinSteeringWheel',
        subscribers: [],
      }
    ]

  });


  bdc2013Id = Components.insert({
    _id : 'BDC2013',
    subcribers: [ ],
    brv: [
      {
        name: 'G001',
        derivates : [ {name : 'G001'}, { name: 'G002'}]
      },
      {
        name: 'G008',
        derivates : [ {name : 'G008'} ]
      },
      {
        name: 'G038',
        derivates : [ {name : 'G038'} ]
      },
      {
        name: 'G030',
        derivates : [ {name : 'G030'}, {name : 'G031'}, {name : 'G032'}]
      },
      {
        name: 'G011',
        derivates : [ {name : 'G011'}, {name : 'G012'}, {name : 'G013'}]
      },
      {
        name: 'RR11',
        derivates : [ {name : 'RR11'}, {name : 'RR12'}, {name : 'RR13'}]
      }
    ],
    caf_blocks : [
      {
        _id:'AirConditioning',
        subscribers: [ ],
      },
      {
        _id:'PfLinSteeringWheel',
        subscribers: [ ],
      }
    ]

  });

  VRM.insert({
    baureihenverbund: 'G030',
    derivate: 'G030',
    sop:'16-03',
    iStufe:'16-11-420',
    steuergeraet_id: bdc2015Id,
    Art:	'TA',
    Benennung: 'Typsortierung',
    _7A01:	'1217A01',
    _7A02: '1217A02'
  });

  VRM.insert({
    baureihenverbund: 'G030',
    derivate: 'G030',
    sop:'16-03',
    iStufe:'16-11-420',
    steuergeraet_id: bdc2015Id,
    Art:	'L',
    Dann_Teil: 'U300',
    Benennung: 'ALPINWEISS 3',
    _7A01:	'O',
    _7A02: 'O'
  });

  VRM.insert({
    baureihenverbund: 'G030',
    derivate: 'G030',
    sop:'16-03',
    iStufe:'16-11-420',
    steuergeraet_id: bdc2015Id,
    Art:	'SA',
    Dann_Teil: 'S4NBA',
    Benennung: 'KLIMAAUTOMATIK  4-ZONEN',
    _7A01:	'0',
    _7A02: '0'
  });

VRM.insert({
    baureihenverbund: 'G030',
    derivate: 'G030',
    sop:'16-03',
    iStufe:'16-11-420',
    steuergeraet_id: bdc2015Id,
    Art:"SA",
    Dann_Teil:"S1CBA",
    Benennung:"CO2 UMFANG",
    _7A01:'O',
    _7A02:'O'
});




  CAF.insert({
    version: 12,
    trunk: true,
    date: new Date(now - 5 * 3600 * 1000),
    changed_by: null,
    ticketId: null,
    i_stufe: '16-11-420',
    release:	'6.31',
    steuergeraet_id: bdc2015Id,
    name: 'AirConditioning',
    comment : null,
    address: '30A0',
    bytes: '39',
    aktivierungs_bedingungen:[
      {
        name: "G001",
        code: 'true'
      },
      {
        name: "G008",
        code: 'true'
      },
      {
        name: "G011",
        code: 'true'
      },
      {
        name: "G030",
        code: 'true'
      },
      {
        name: "G038",
        code: 'true'
      },
      {
        name: "RR11",
        code: 'true'
      },
    ],
    functions: [
      {
        name: 'AIC_DRUCKSENSOR',
        comment : null,
        start_byte: '0',
        end_byte: '0',
        mask: '11000000',
        obd_relevant: 'true',
        special_value: '01',
        parameters: [
          {
            name: 'LinSensor',
            comment: null,
            code_value: '02',
            brv: [
              {
                name: 'G001',
                code: 'false'
              },
              {
                name: 'G008',
                code: 'false'
              },
              {
                name: 'G011',
                code: '(1CB_ACEA_CO2) + !(PLUGIN_HYBRID)'
              },
              {
                name: 'G030',
                code: '(1CB_ACEA_CO2, KMKU_KLIMAKOMPRESSOR_MIT_KUPPLUNG, N63B40, N63B44, N74B66) + !(PLUGIN_HYBRID)'
              },
              {
                name: 'G038',
                code: 'KEIN_HYBRID'
              },
              {
                name: 'RR11',
                code: 'false'
              }
            ]
          },
          {
            name: 'analogerSensor',
            comment:null,
            code_value: '01',
            brv: [
              {
                name: 'G001',
                code: '(1CB_ACEA_CO2) + !(PLUGIN_HYBRID)'
              },
              {
                name: 'G008',
                code: '(1CB_ACEA_CO2, KMKU_KLIMAKOMPRESSOR_MIT_KUPPLUNG, N63B40, N63B44, N74B66) + !(PLUGIN_HYBRID)'
              },
              {
                name: 'G011',
                code: 'true'
              },
              {
                name: 'G030',
                code: 'true'
              },
              {
                name: 'G038',
                code: 'true'
              },
              {
                name: 'RR11',
                code: 'true'
              }
            ]
          },
          {
            name: 'nicht_aktiv',
            comment: null,
            code_value: '00',
            brv: [
              {
                name: 'G001',
                code: '!(((1CB_ACEA_CO2) + !(PLUGIN_HYBRID)), (PLUGIN_HYBRID))'
              },
              {
                name: 'G008',
                code: '!((KEIN_HYBRID), (!(KEIN_HYBRID)))'
              },
              {
                name: 'G011',
                code: '!(((1CB_ACEA_CO2, KMKU_KLIMAKOMPRESSOR_MIT_KUPPLUNG, N63B40, N63B44, N74B66) + !(PLUGIN_HYBRID)), (PLUGIN_HYBRID))'
              },
              {
                name: 'G030',
                code: '!(((1CB_ACEA_CO2) + !(PLUGIN_HYBRID)), (PLUGIN_HYBRID))'
              },
              {
                name: 'G038',
                code: '~alle_Anderen~ !((!(PLUGIN_HYBRID)), (PLUGIN_HYBRID))'
              },
              {
                name: 'RR11',
                code: '~alle_Anderen~ !((KEIN_HYBRID), (!(KEIN_HYBRID)))'
              }
            ]
          }
        ]
      },
      {
        name: 'AIC_WASSER_VENTIL_FA',
        comment: null,
        start_byte: '1',
        end_byte: '1',
        mask: '00000010',
        obd_relevant: 'true',
        special_value: '01',
        parameters: [
          {
            name: 'aktiv',
            comment: null,
            code_value: '01',
            brv: [
              {
                name: 'G001',
                code: 'false'
              },
              {
                name: 'G008',
                code: 'false'
              },
              {
                name: 'G011',
                code: '!(4NB_4ZONENKLIMAAUTOMATIK, G013)'
              },
              {
                name: 'G030',
                code: '(534_2ZONENKLIMAAUTZUSATZFKT, F090) + !(4NB_4ZONENKLIMAAUTOMATIK)'
              },
              {
                name: 'G038',
                code: '!(4NB_4ZONENKLIMAAUTOMATIK)'
              },
              {
                name: 'RR11',
                code: 'false'
              }
            ]
          },
          {
            name: 'nicht_aktiv',
            comment: null,
            code_value: '01',
            brv: [
              {
                name: 'G001',
                code: 'true'
              },
              {
                name: 'G008',
                code: 'true'
              },
              {
                name: 'G011',
                code: '!(4NB_4ZONENKLIMAAUTOMATIK, G013)'
              },
              {
                name: 'G030',
                code: '~alle_Anderen~ !(((534_2ZONENKLIMAAUTZUSATZFKT, F090) + !(4NB_4ZONENKLIMAAUTOMATIK)))'
              },
              {
                name: 'G038',
                code: '~alle_Anderen~ !((!(4NB_4ZONENKLIMAAUTOMATIK)))'
              },
              {
                name: 'RR11',
                code: 'true'
              }
            ]
          }
        ]
      }
    ]


  });

  CAF.insert({
    version: 12,
    trunk: true,
    date: new Date(now - 5 * 3600 * 1000),
    changed_by: null,
    ticketId: null,
    i_stufe: '16-11-420',
    release:	'6.31',
    steuergeraet_id: bdc2015Id,
    name: 'PfLinSteeringWheel',
    comment : null,
    address: '3140',
    bytes: '23',
    aktivierungs_bedingungen:[
      {
        name: "G001",
        code: "true"
      },
      {
        name: "G008",
        code: "true"
      },
      {
        name: "G011",
        code: "true"
      },
      {
        name: "G030",
        code: "true"
      },
      {
        name: "G038",
        code: "true"
      },
      {
        name: "RR11",
        code: "true"
      },
    ],
    functions: [
      {
        name: 'LIN_VARIANTE_SZL',
        comment: null,
        start_byte: '0',
        end_byte: '0',
        mask: '00000011',
        obd_relevant: 'true',
        special_value: '01',
        parameters: [
          {
            name: 'szl_basis',
            comment: "szl basic07.10.2014 PK: Erweiterung um \"+ !(US + !(838_KANADA))\" (CCB: 4301)29.07.2014 PK: changed from false to new coding for F52 [F045] (CCB: 4197)",
            code_value: '02',
            brv: [
              {
                name: 'G001',
                code: '(PLUGIN_HYBRID) + !(536_STANDHEIZUNG) + 4NB_4ZONENKLIMAAUTOMATIK'
              },
              {
                name: 'G008',
                code: 'false'
              },
              {
                name: 'G011',
                code: 'false'
              },
              {
                name: 'G030',
                code: '(PLUGIN_HYBRID) + !(536_STANDHEIZUNG) + 4NB_4ZONENKLIMAAUTOMATIK'
              },
              {
                name: 'G038',
                code: 'false'
              },
              {
                name: 'RR11',
                code: 'false'
              }
            ]
          },
          {
            name: 'szl_aic',
            comment: null,
            code_value: '01',
            brv: [
              {
                name: 'G001',
                code: 'true'
              },
              {
                name: 'G008',
                code: 'true'
              },
              {
                name: 'G011',
                code: 'true'
              },
              {
                name: 'G030',
                code: '(4NB_4ZONENKLIMAAUTOMATIK, 534_2ZONENKLIMAAUTZUSATZFKT, F090, 842_KALTLANDAUSFUEHR) + !(536_STANDHEIZUNG)'
              },
              {
                name: 'G038',
                code: 'true'
              },
              {
                name: 'RR11',
                code: 'true'
              }
            ]
          },
          {
            name: 'szl_4Band',
            code_value: '00',
            brv: [
              {
                name: 'G001',
                code: 'false'
              },
              {
                name: 'G008',
                code: 'false'
              },
              {
                name: 'G011',
                code: 'false'
              },
              {
                name: 'G030',
                code: 'false'
              },
              {
                name: 'G038',
                code: 'false'
              },
              {
                name: 'RR11',
                code: 'false'
              }
            ]
          }
        ]
      },
      {
        name: 'MFL_VERBAUT',
        comment: null,
        start_byte: '0',
        end_byte: '0',
        mask: '00000011',
        obd_relevant: 'true',
        special_value: '01',
        parameters: [
          {
            name: 'aktiv',
            code_value: '02',
            brv: [
              {
                name: 'G001',
                code: 'false'
              },
              {
                name: 'G008',
                code: 'false'
              },
              {
                name: 'G011',
                code: 'false'
              },
              {
                name: 'G030',
                code: 'false'
              },
              {
                name: 'G038',
                code: 'false'
              },
              {
                name: 'RR11',
                code: 'false'
              }
            ]
          },
          {
            name: 'nicht_aktiv',
            comment: null,
            code_value: '01',
            brv: [
              {
                name: 'G001',
                code: 'true'
              },
              {
                name: 'G008',
                code: 'true'
              },
              {
                name: 'G011',
                code: 'true'
              },
              {
                name: 'G030',
                code: '~alle_Anderen~ !(((534_2ZONENKLIMAAUTZUSATZFKT, F090) + !(4NB_4ZONENKLIMAAUTOMATIK)))'
              },
              {
                name: 'G038',
                code: 'true'
              },
              {
                name: 'RR11',
                code: 'true'
              }
            ]
          }
        ]
      }
    ]

  });

  CAF.insert({
    version: 1,
    trunk: true,
    date: new Date(),
    changed_by: null,
    ticketId: null,
    i_stufe: '16-11-420',
    release:	'6.31',
    steuergeraet_id: bdc2013Id,
    name: 'AirConditioning',
    address: '30A0',
    bytes: '40',
    aktivierungs_bedingungen:[
      {
        name: "F045",
        code: "true"
      },
      {
        name: "F056",
        code: "true"
      },
      {
        name: "F015",
        code: "true"
      },
      {
        name: "M013",
        code: "true"
      },
      {
        name: "I001",
        code: "true"
      }
    ],
    functions: [
      {
        name: 'AIC_HYBRID_AC_COOLING_SHUTOFF_VALVE',
        comment: "Klimaabschaltventil Hybrindfahrzeuge verbaut \r\n\r\nWird in der LK nicht benötigt",
        start_byte: '0',
        end_byte: '0',
        mask: '00010000',
        obd_relevant: 'false',
        special_value: '01',
        parameters: [
          {
            name: 'nicht_aktiv',
            code_value: '00',
            brv: [
              {
                name: "F045",
                code: "true"
              },
              {
                name: "F056",
                code: "true"
              },
              {
                name: "F015",
                code: "true"
              },
              {
                name: "M013",
                code: "true"
              },
              {
                name: "I001",
                code: "true"
              }
            ]
          },
          {
            name: 'aktiv',
            code_value: '01',
            brv: [
              {
                name: "F045",
                code: "false"
              },
              {
                name: "F056",
                code: "false"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          }
        ]
      },
      {
        name: 'AIC_DRUCKSENSOR',
        comment: "Drucksensor oder Druck-Temperatur-Sensor (LIN) fuer Kaeltemittel\r\n\r\nLIN wird nicht mehr verwendet",
        start_byte: '0',
        end_byte: '0',
        mask: '11000000',
        obd_relevant: 'false',
        special_value: '01',
        parameters: [
          {
            name: 'LinSensor',
            code_value: '02',
            brv: [
              {
                name: "F045",
                code: "false"
              },
              {
                name: "F056",
                code: "false"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          },
          {
            name: 'analogerSensor',
            code_value: '01',
            brv: [
              {
                name: "F045",
                code: "true"
              },
              {
                name: "F056",
                code: "F054, 534_2ZONENKLIMAAUTZUSATZFKT, (530_KLIMAANLAGE, F060)"
              },
              {
                name: "F015",
                code: "true"
              },
              {
                name: "M013",
                code: "true"
              },
              {
                name: "I001",
                code: "true"
              }
            ]
          },
          {
            name: 'nicht_aktiv',
            code_value: '00',
            brv: [
              {
                name: "F045",
                code: "false"
              },
              {
                name: "F056",
                code: "false"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          }
        ]
      },
      {
        name: 'AIC_AUC_SENSOR',
        comment: "Art der Ansteuerung des Kompressorventils, Stromregelung oder gepulste Steuerung\r\n\r\nWird in der LK nicht benötigt",
        start_byte: '1',
        end_byte: '1',
        mask: '00011000b',
        obd_relevant: 'false',
        special_value: '01',
        parameters: [
          {
            name: 'LinSensor',
            code_value: '02',
            brv: [
              {
                name: "F045",
                code: "false"
              },
              {
                name: "F056",
                code: "false"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          },
          {
            name: 'analogerSensor',
            code_value: '01',
            brv: [
              {
                name: "F045",
                code: "534_2ZONENKLIMAAUTZUSATZFKT"
              },
              {
                name: "F056",
                code: "534_2ZONENKLIMAAUTZUSATZFKT"
              },
              {
                name: "F015",
                code: "534_2ZONENKLIMAAUTZUSATZFKT, 4NB_4ZONENKLIMAAUTOMATIK, F085, F086"
              },
              {
                name: "M013",
                code: "534_2ZONENKLIMAAUTZUSATZFKT"
              },
              {
                name: "I001",
                code: "534_2ZONENKLIMAAUTZUSATZFKT, I012"
              }
            ]
          },
          {
            name: 'nicht_aktiv',
            code_value: '00',
            brv: [
              {
                name: "F045",
                code: "(B38A12, B37C15, (Baustand>=1503 + B46A20 + 1CB_ACEA_CO2), B47C20, (B38A15 + 1CB_ACEA_CO2), (B48A20 + 1CB_ACEA_CO2), (F045 + (Baustand<1503, KMKU_KLIMAKOMPRESSOR_MIT_KUPPLUNG))) + KEIN_HYBRID + (!(F049), (F049 + KMKU_KLIMAKOMPRESSOR_MIT_KUPPLUNG))"
              },
              {
                name: "F056",
                code: "((B36A15 + 1CB_ACEA_CO2), B38A12, B37C15, (B46A20 + 1CB_ACEA_CO2), B47C20, (B38A15 + 1CB_ACEA_CO2), (B48A20 + 1CB_ACEA_CO2), ((F055, F056) + (Baustand<1503, KMKU_KLIMAKOMPRESSOR_MIT_KUPPLUNG)), (Baustand>=1411 + (F055, F056) + (US, 838_KANADA, 802_KOREA))) + KEIN_HYBRID + (F054, F060, 530_KLIMAANLAGE, 534_2ZONENKLIMAAUTZUSATZFKT)"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          }
        ]
      }
    ]

  });

  CAF.insert({
    version: 1,
    trunk: true,
    date: new Date(),
    changed_by: null,
    ticketId: null,
    i_stufe: '16-11-420',
    release:	'6.31',
    steuergeraet_id: bdc2013Id,
    name: 'PfLinSteeringWheel',
    address: '30A0',
    bytes: '40',
    aktivierungs_bedingungen:[
      {
        name: "F045",
        code: "true"
      },
      {
        name: "F056",
        code: "true"
      },
      {
        name: "F015",
        code: "true"
      },
      {
        name: "M013",
        code: "true"
      },
      {
        name: "I001",
        code: "true"
      }
    ],
    functions: [
      {
        name: 'LIN_VARIANTE_SZL',
        comment: "LIN variant for the SZL, FF means not check of the variant id",
        start_byte: '0',
        end_byte: '0',
        mask: '00010000',
        obd_relevant: 'false',
        special_value: '01',
        parameters: [
          {
            name: 'szl_basis',
            code_value: '00',
            brv: [
              {
                name: "F045",
                code: "true"
              },
              {
                name: "F056",
                code: "true"
              },
              {
                name: "F015",
                code: "true"
              },
              {
                name: "M013",
                code: "true"
              },
              {
                name: "I001",
                code: "true"
              }
            ]
          },
          {
            name: 'szl_aic',
            code_value: '01',
            brv: [
              {
                name: "F045",
                code: "false"
              },
              {
                name: "F056",
                code: "false"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          }
        ]
      },
      {
        name: 'SZL_ALIVE_COUNTER',
        comment: "Drucksensor oder Druck-Temperatur-Sensor (LIN) fuer Kaeltemittel\r\n\r\nLIN wird nicht mehr verwendet",
        start_byte: '0',
        end_byte: '0',
        mask: '11000000',
        obd_relevant: 'false',
        special_value: '01',
        parameters: [
          {
            name: 'nicht_aktiv',
            code_value: '02',
            brv: [
              {
                name: "F045",
                code: "false"
              },
              {
                name: "F056",
                code: "false"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          },
          {
            name: 'aktiv',
            code_value: '01',
            brv: [
              {
                name: "F045",
                code: "true"
              },
              {
                name: "F056",
                code: "F054, 534_2ZONENKLIMAAUTZUSATZFKT, (530_KLIMAANLAGE, F060)"
              },
              {
                name: "F015",
                code: "true"
              },
              {
                name: "M013",
                code: "true"
              },
              {
                name: "I001",
                code: "true"
              }
            ]
          }
        ]
      },
      {
        name: 'MFL_VERBAUT',
        comment: "LIN variant for the MFL, FF means not check of the variant id\r\n\r\n22.7.10,AZ: für I001 fehlt eine LIN-Variante (Acc+Stauassistent),SA5DF für Stauassistent.\r\n03.08.10, AZ: für F030 fehlt SA710 (255,710),M-Sport immer bei M-Fahrzeug, das ist neuerdings eine eigene Baureihe (M3 = F080)\r\n06.12.12, AL (CCB 3022):MFL-LIN Varianten abhängig vom SA 710 M_Sportlenkrad, neue Varianten für F85,F86",
        start_byte: '1',
        end_byte: '1',
        mask: '00011000b',
        obd_relevant: 'false',
        special_value: '01',
        parameters: [
          {
            name: 'aktiv',
            code_value: '02',
            brv: [
              {
                name: "F045",
                code: "false"
              },
              {
                name: "F056",
                code: "false"
              },
              {
                name: "F015",
                code: "false"
              },
              {
                name: "M013",
                code: "false"
              },
              {
                name: "I001",
                code: "false"
              }
            ]
          },
          {
            name: 'nicht_aktiv',
            code_value: '01',
            brv: [
              {
                name: "F045",
                code: "534_2ZONENKLIMAAUTZUSATZFKT"
              },
              {
                name: "F056",
                code: "534_2ZONENKLIMAAUTZUSATZFKT"
              },
              {
                name: "F015",
                code: "534_2ZONENKLIMAAUTZUSATZFKT, 4NB_4ZONENKLIMAAUTOMATIK, F085, F086"
              },
              {
                name: "M013",
                code: "534_2ZONENKLIMAAUTZUSATZFKT"
              },
              {
                name: "I001",
                code: "534_2ZONENKLIMAAUTZUSATZFKT, I012"
              }
            ]
          }
        ]
      }
    ]

  });


}