const axios = require("axios");

const dummy_restaurants = [
  {
    name: "Boulevard",
    rating: 4.6,
    address: "1 Mission St, San Francisco, CA 94105, United States",
    photo_reference:
      "AUjq9jmyzRWrnYkOb8VwT_UhzGDRqTDNsIMAGXSLvV-7qrWXMacje6U_XpJgeTFknm2h7fHi7XCRXlkAO0SJyATM_-cOJ6OcrZqsw9HDq9iJ4WrV6BvYwJiVNMk4gA-oXoA3Wb7RcCZqL_wtvmQqjy7PbIe3pQOEi_83hnpU9Kdnm-EMehUx",
    place_id: "ChIJF-zbSmSAhYARvOafjdCRszQ",
    price: 100,
    num_ratings: 1419,
  },
  {
    name: "Sotto Mare",
    rating: 4.6,
    address: "552 Green St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jmY1TInsAFFZBDW1QmEY0-_f3kvWBGhqYIMgqSxIj_gugPQDb-So2DQj4dsc1DzdutnRlGtFsB0qAJnNLt6Y1DoGSnFlOg3hbJ45dnnDSWHEQO_919TfGOW_Kz_XWWGS3wZQsKbEblFQbv_cyFdBwSdDhG6T862aYeWQa_ITT9zM8MX",
    place_id: "ChIJQfYyVvGAhYARJVwoboB1WKQ",
    price: 25,
    num_ratings: 3296,
  },
  {
    name: "Delancey Street Restaurant",
    rating: 4.6,
    address: "600 The Embarcadero, San Francisco, CA 94107, United States",
    photo_reference:
      "AUjq9jm5Z56bOqX702J8xsJTjsnBtKKF_lbkOjcwl8NnGawHnjbDm6UMf0sP9CQW3yW_zMEdZnrzpbJmjy_VJ2D30Sh1blT_ypf8faxBxkTI-T5YULLYKHSRJsF7Eba4qCx7eMTu5s6gHRCVyFv67JkqY4PfNXCn88f6SXkCqxh0-_yok5It",
    place_id: "ChIJTRf2DXeAhYARsjppfRXu44s",
    price: 12.5,
    num_ratings: 1307,
  },
  {
    name: "Rich Table",
    rating: 4.7,
    address: "199 Gough St, San Francisco, CA 94102, United States",
    photo_reference:
      "AUjq9jlXy3Wstt4UOtYoEikuj4-OgaHwx6Txmx6owRmAlpyspHVq126dzj9PlX6AykNMUwh8RZajb4k0V6FdE7XcDNVtKc-FfR6HI86yWmZSp1YDXZJlaN7TPR_1HSKd2QaZbt92drHT6z6Bos67_ADBu1B4CZigHg03AtJiiX39BIS2xHV1",
    place_id: "ChIJh_24QJ-AhYAR_xbUNVN2Xns",
    price: 50,
    num_ratings: 1192,
  },
  {
    name: "Trestle Restaurant",
    rating: 4.6,
    address: "531 Jackson St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jmiB1O0_oFTGyNKCpSuw3567b3wB-IE3ZpJUEw8GlmyCSxCPxXxX6BhOJrzYHGgrcnEDMeWanFbUkMV9IZuyOEKbiCoOLOJXAkfrGapwn6bRc5ZWqQbSKo_Ta4gfdFLAL0DE5x0O-7Z2r81fD9poZ7Ck4xfmdqkfs7Z0xCa7F2dCrF2",
    place_id: "ChIJXX7b1vSAhYARvD0AU-P83P8",
    price: 25,
    num_ratings: 792,
  },
  {
    name: "Lazy Bear",
    rating: 4.8,
    address: "3416 19th St, San Francisco, CA 94110, United States",
    photo_reference:
      "AUjq9jmzquIeYWLb7lbTTKKCV5_x1jKHDkYgK0Cl1h-abAq_sj9Wv2sjFkCY95y3V2FGCt4w_9x61e8he4e9GPZx8-36EZ9GyRoTZX459zWro2WDP21YpFo9uYYnhen78r6dnxNooszZ_Kbzr8MLtpkFlzT3CWLYYd86G9eIpuUayaUZnWem",
    place_id: "ChIJk35bizx-j4AREil6UPp7Jn4",
    price: 100,
    num_ratings: 921,
  },
  {
    name: "Californios",
    rating: 4.8,
    address: "355 11th St, San Francisco, CA 94103, United States",
    photo_reference:
      "AUjq9jkf8Pp5oLNcpORspWp4ujHYWp22GV5Whn5M6CyBqCe3yKwSvFrNReHOxpINFYMPCTX32vbgM-Ek4-xmI3OupxJ-6al87bFhqyQtkfKj4pUJpXAcgD8TzO3pSj9MOcnGTVYoGKnGj4G3oRitt4Z4DZXcV8HXz_DRbNGwe3DlKeNOJPxQ",
    place_id: "ChIJIfD0wjh-j4ARbWVBlaGpKnU",
    price: 100,
    num_ratings: 325,
  },
  {
    name: "Liholiho Yacht Club",
    rating: 4.7,
    address: "871 Sutter St, San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jkd3s-wxp4nG2ZI0g-4usC37AqBM1pFvt6SbjnlCteqixEVzDiPWbqcY4CIcK4T_b3GAMDGlb10DqxFgGmdhi5s0UiHeBPm5kjZoAjSfK0ePkvKYin4RmSSoGLGu_uLR95E-iiybAilW8Pk_RdOFq4p1eCaP5Dyb2cLXEkYQhciJ9_j",
    place_id: "ChIJkVSnJpKAhYARCSaDnRo5brE",
    price: 50,
    num_ratings: 1445,
  },
  {
    name: "Cotogna",
    rating: 4.6,
    address: "490 Pacific Ave, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jnLtuKuqMwCuOKaJeqzrfna-FzmNSqN4OopM6yT3hNpUtJG72LkJ2sER4JrdrA0n44YTTIF1OPnL5XlrwIay_qzcr4yyxajj1l8iE0zmj43WYp-oXJjW_XfRaA65fO5E26eLJiPti4wNdlLqabjQeMMqzcTbz4qG5kTN5UfsgC7YJDe",
    place_id: "ChIJA0YvGPWAhYAReXmaDTTdWzU",
    price: 50,
    num_ratings: 1387,
  },
  {
    name: "Street Restaurant and Bar",
    rating: 4.6,
    address: "2141 Polk St, San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jncmnjPIGbW1mwMgoK9cKDSVLm7hvXiudkSUMiBK5IgVRlt1Fvy9LguIpDZPSbEyTUA9q3x2E_JDfRhmbO18tRY6Lp_9KOV-_hOWt50hl3SjlBVkgvjCtq9qBZzzJR7l1qGatqKfXDncW9QseXNN4e_cOni2Hu0HcsTEbn_Hode2CXp",
    place_id: "ChIJP61Jo-mAhYARynPDnUkRBr0",
    price: 25,
    num_ratings: 171,
  },
  {
    name: "Acquerello",
    rating: 4.6,
    address:
      "NEAR VAN NESS &, 1722 Sacramento St, San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jnQTMLZLQXGaBPlVAeaeFyYsAJJPYGKc3_ycL-FKPjy9j0CUxqzRLlR7VK7UKqxFl8TMdwG_rlMBsIezqrOOw19uM0lJ8L7Ma1IOsgzMFEHWCekWv5bMYpKdADLgZO--AcCVcSjOwgE4PaLuOGvr_RiRo7VDykTtzhtdBKAW_Tn5Ddt",
    place_id: "ChIJwYdY3uqAhYARXUJUOIELoqU",
    price: 100,
    num_ratings: 468,
  },
  {
    name: "Monsieur Benjamin",
    rating: 4.4,
    address: "451 Gough St, San Francisco, CA 94102, United States",
    photo_reference:
      "AUjq9jnskcv-QrQS2Um_MqFIyYqrhE2M3mUIwh64acivhJY2W-urTHHGUegXG9Qoi3iloZv4Fwbw_iScWFYWurWIa0syzv2bufPxn9Wy1QKuNuDiBx5rrWqw9ii5t-Dp9EI2_tM2hKfCYih9X5kmbwi-t3CT_rfCMv1AVSo9aKvIkjR8Rd8X",
    place_id: "ChIJp0l1kZiAhYARSdsaDqr2fdc",
    price: 50,
    num_ratings: 887,
  },
  {
    name: "La Ciccia",
    rating: 4.7,
    address: "291 30th St, San Francisco, CA 94131, United States",
    photo_reference:
      "AUjq9jkX6Y3wLHPfWD8fE3-s7ubGw9nR3wqgFUBNAdGn6d85tIKZiz3T7pqCK4cAelljD_uS6wd_adKdnChLgHgud1SMkGQT81Kg7AKJgq3oQ-rsYzLNRPNUF4-jFW-39S_t7IiFMAVBG9V_UfsDLtjqoTij4l_4GS6oV9IpLJsSyn2rGyQs",
    place_id: "ChIJc9N1Y2h-j4ARaE2RERU0Ovs",
    price: 50,
    num_ratings: 589,
  },
  {
    name: "Absinthe Brasserie & Bar",
    rating: 4.4,
    address: "398 Hayes St, San Francisco, CA 94102, United States",
    photo_reference:
      "AUjq9jk9bGEuzlQ3tt0J4j6CIT5solUnpgNi7LEUH3RqwHHGPbTTLaqP9O6-wPSzM9HvWq3HUDaouJD-_GdIUXKA1l9_6reL3AfJgKtb8sU8fIzATPyDTF_uQYQHF5tCvVUqU8QdOu-XhcxMEhuB5xHjKPtB_8Mgx9X0VToHArOwyDLR3F1x",
    place_id: "ChIJ1T-IlZiAhYAR5m-Mps4qLFk",
    price: 50,
    num_ratings: 1599,
  },
  {
    name: "Chapeau",
    rating: 4.7,
    address: "126 Clement St, San Francisco, CA 94118, United States",
    photo_reference:
      "AUjq9jlxfXkM3yXJWcJkS1JfMxX8GWrYo5W5qPi6H5Hlx0FAWMfw6WLeJ83uzUm1oc1ulGZ_hBJjlPNFL_I3OkKnEIze5P8h1S3DVgUYGwaKSlDUNywu-HpxkOIQimwIM8yazDHXc-8odqla3jYb6F9M4LD9DrrTut6asR9Mj-8CeKEFJkei",
    place_id: "ChIJs0HxgDmHhYARAoIYlNJMScA",
    price: 50,
    num_ratings: 615,
  },
  {
    name: "Octavia",
    rating: 4.6,
    address: "1701 Octavia St, San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jmh_3mQWNolLHzs4jRSG8j2Grnh3IqRkRKwiwAGWZ7sfuH1S_ddWx1cTpB-WfX5P3gUwlfQlDmrFnXzwNJua4LUHNCQ13waSX1ViOKoMjHuekox9BsP-pZYedVBxvlIND2KNQfUl6zO26NkYrh5r1m0m6r8IbFoxPkByA048lVLiL-5",
    place_id: "ChIJs32Mdr-AhYARZmI19fIPvOM",
    price: 100,
    num_ratings: 613,
  },
  {
    name: "House of Prime Rib",
    rating: 4.7,
    address: "1906 Van Ness Ave, San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jnQGiPjlPah6KGdezVMhI5OXXLXoRG9XLJsZOOOkIJLIRsHZvc7ZbUvtgsb33fT2aI-G_Ea0Y6GeZJT7lPMo1Nde0UX7tTA7j-Xrw3mJeeskjWm6u6OuNEA8sJyzHznMzwxg9dF9KRjd2zj6QaqcjMRCVR4LrJ3119qJx_-n_e0jIg_",
    place_id: "ChIJg67caeqAhYAR2UQjKb1a8j4",
    price: 50,
    num_ratings: 5188,
  },
  {
    name: "Frances",
    rating: 4.7,
    address: "3870 17th St, San Francisco, CA 94114, United States",
    photo_reference:
      "AUjq9jkIDnuzjU0FYUqC-XTXfrU4Ej8QvQEAyf2mIocUmrDJ9nKXXkq4XxlJshmewSW2Rgh41cZ1RPL5j1BqqGawYxU_WlmwIWBExdtZhRzFq2eFQOoSSJYBTXHnXkD8lv3ZUC_FVCE2z5SA9HO3NpagXqYioiBrGf2YFzVHrBsNTaA6uKi_",
    place_id: "ChIJky2knBt-j4ARXAdR3-GAWM8",
    price: 100,
    num_ratings: 606,
  },
];

const dummy_attractions = [
  {
    name: "PIER 39",
    rating: 4.6,
    address: "The Embarcadero, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jl6yhZUBNorDhPZdCBrx8jngP7KtMjcaTTtqbmhYqxMbwFhfJAcPCuTZAH9t-oqkI8oak1qyWxjrL_-FI_jAUFs5EwHbp6Kx0AxRbChFM4OpVSwjPn3Srp48Q-ZoURVTJRZ02WW3cQalCtBlYa3jV5qP9s2YG9C_t3RFjpR37_S3k4",
    place_id: "ChIJHSGzi_yAhYARnrPmDWAx9ro",
    num_ratings: 110780,
    price: 0,
  },
  {
    name: "Madame Tussauds San Francisco",
    rating: 4.3,
    address: "145 Jefferson St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jn1KBHNGVv1hqk-aDinM-_Dv8823dPDJ-5YWKJsJSy1W8JFvZA7ZmN1_FW0a8jD9N7jQrWZHl0E5q1VyylNeNQLKju884HcExLDGdpFD_7F3InYwsWqlQ2FU3DLj_bUkGkl-O68Rphhx_F0BT8cVWLaEo6lu2UDh_r_NEbuPcEuAZF4",
    place_id: "ChIJy3Ksp-OAhYARthoGyFztDtA",
    num_ratings: 2430,
    price: 0,
  },
  {
    name: "San Francisco Maritime National Historical Park",
    rating: 4.6,
    address: "San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jnuaGoDnzXLktfgswnDgmOaA4JU66qxVTMy4dFl1gi9E_SG18_OZEyYjj-61uNEC0D9aArzzV2JyGMnyILg9wHpgSeC5CQhfMSsjtufRW2TLsjmh_7abmKa4-JLimzgxI91RpVORw7D1YsDxSo09Ohb9HuoRAH2WNzJy5vbMxLFLLWk",
    place_id: "ChIJ7bPtqOGAhYARlc1YRlOfGrc",
    num_ratings: 4555,
    price: 25,
  },
  {
    name: "Lands End Lookout",
    rating: 4.8,
    address: "680 Point Lobos Ave, San Francisco, CA 94121, United States",
    photo_reference:
      "AUjq9jm-EQatVnTKqeSZxsALFDHlW0Pl15U4VBj9jUoKRcvrLcez0Xn1I5KyYPXzWPoP77CCcdfhGHajVXMxbFHsvHfW8G1yQ8PJgiuhsrkQNXjMkabxG8gDYiJSBkWvu4RjczImDGrYiGgzN0hAlacmfZOHOAlE4uLfGbpOwdgJczmSCR82",
    place_id: "ChIJud4Rs7KHhYARZX7u45tQsjA",
    num_ratings: 7204,
    price: 0,
  },
  {
    name: "Oracle Park",
    rating: 4.7,
    address: "24 Willie Mays Plaza, San Francisco, CA 94107, United States",
    photo_reference:
      "AUjq9jm-yr1tnsq9gj2D1ztJ1Q6lVorVIwUeAPR3lW25AQRlYvwzshOUyw7Epx4kVUlydUm_DCxJaqjThXryjQylS8z9_5TgpkWF36ZcnU_RFers5bmfzCrCRwzeTKOuEbfZR9Dio9KvF6BpfXu2VtKEsCDECWqLoNL0z1119bGIbD1YqHII",
    place_id: "ChIJ_T25cNd_j4ARehGmHe0pT84",
    num_ratings: 24242,
    price: 0,
  },
  {
    name: "Ina Coolbrith Park",
    rating: 4.8,
    address: "Vallejo & Taylor, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jmcVV2ZHTvQ8DqB0K7mnacbJv2u5VsXTg6Fhqcban7ASmcsdz8iNdMGowzCbz47BxmyG6OFkBaQ7UgAsr9cDX3KcYSWDd0tJirFHDA95_DQ5yN6acpByUha9n1M3vl87Fvzuh67a-ifwflvEN0A3pEbqboks9kyiEZyBOYCI2LDZJuh",
    place_id: "ChIJdx6kBe6AhYARsPFmpUAvvcY",
    num_ratings: 1225,
    price: 0,
  },
  {
    name: "Hyde Street Pier",
    rating: 4.6,
    address: "2905 Hyde St, San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jkxh0nT0Bvw94DRB__vqTNEttLekfvVcG2TinybKZKNdQSpkOi1rq71esGk8QsVo3VKwb-UGbHrZLSMYeaSINlaDnr10GT0Ng1olobEdOw-sBcW-IDAZGEe5ZSc7nSHneY5yl_BysQ8PwvfCj58-f5vvv5rOzJcoUs-WG7e8kwWjvD_",
    place_id: "ChIJ7XU8qeGAhYARMd5brm8JUSs",
    num_ratings: 594,
    price: 0,
  },
  {
    name: "Exploratorium",
    rating: 4.7,
    address:
      "Pier 15 Embarcadero at, Green St, San Francisco, CA 94111, United States",
    photo_reference:
      "AUjq9jmXVzehidjHBII7uMZxSeQnTfvogsfEQBrI3X1ZGYy1ScqjaJNcWPh3_DIqOcn_klOjDZ7ZDSkkRJkHEa0rChj0V-fn3EQLSlRBwZmLLW-TWktbWVyWkkjY00AfCcUVs-ryJvJQ850qtopMAZzm8iB5MA8vYlZV7y3F0jCTp3qgbzz6",
    place_id: "ChIJk2vl5NSGhYARwPGvs_ubIws",
    num_ratings: 7713,
    price: 25,
  },
  {
    name: "Golden Gate Bridge",
    rating: 4.8,
    address: "Golden Gate Bridge, San Francisco, CA, United States",
    photo_reference:
      "AUjq9jm5a39Fkc8vBp-Rq9Qh4LXDGyRPLhFH2clW3WS3xkjJylfNs5s8rvkuxferh0bejhkKvzNaq0BXliYRSFpxzcQwgJ7dynMpK4YOiftP_OT1sO7s4waylintzEONYOgBQOlOIemaFW3eJbTe2zXopYQnK94qsoNFNKCEVSqGwV2SnKWb",
    place_id: "ChIJw____96GhYARCVVwg5cT7c0",
    num_ratings: 65662,
    price: 0,
  },
  {
    name: "Aquarium of the Bay",
    rating: 4.2,
    address:
      "PIER 39 The Embarcadero &, Beach St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jkLjF-yohf6ZSZNcmoUiGtn24EJW9zeP7hdH1rYZFdZuVEjXybgAprAtoL4H9X8ZsC6My7QLZBPLDBlm0jUuC-pT3i1IGX1mXHjVscAIhZG7_YaX9nwatwzC89fxVqebcVX0yoa8fAVWilcl7auAnpRwedqaioXzlz6sdFPDw7XJcWt",
    place_id: "ChIJr6OmefyAhYAR-h8_vW9p5GQ",
    num_ratings: 4452,
    price: 75,
  },
  {
    name: "Twin Peaks",
    rating: 4.7,
    address: "501 Twin Peaks Blvd, San Francisco, CA 94114, United States",
    photo_reference:
      "AUjq9jlBgOdDTzELKKYz4dSDle7a7z4jonxNsWtBDwAc2D9Mg1Tp40Tt6rRDzvBeBYwjHi_5HdLI6Y0nmVJF0ntHba97-K60hr88dYdczjiXz--6HyPd_TcGY1Cdv9JrreBK8HVy52jfPtEriXz9wSg6ijiLdRecC7SQD-8HkC3o5AQTMGPN",
    place_id: "ChIJt3HwrOJ9j4ARbW6uAcmhz7I",
    num_ratings: 12109,
    price: 0,
  },
  {
    name: "Legion of Honor",
    rating: 4.7,
    address: "100 34th Ave, San Francisco, CA 94121, United States",
    photo_reference:
      "AUjq9jlQLMlXMutfo2HK6N1nYTr1WnvBDFjeVZw-qmdWuyFIMBA0qmgL2kfloAe1UrnDTT5_lfV_ZIhDcypUXjR8LDnCy7b8wkUiO77XnTMQX8Voa5nxW917iID4ldkNbLAuk-cfbemCcMbeI4DDM6jqn-A_Y7VJIObBBxem3oNQL4jkeCJp",
    place_id: "ChIJabri1qyHhYARLE0Vd4zY_7k",
    num_ratings: 3427,
    price: 25,
  },
  {
    name: "USS San Francisco Memorial",
    rating: 4.7,
    address: "San Francisco, CA 94121, United States",
    photo_reference:
      "AUjq9jlgVLQHBmX04y4HOMm-4BEr4PzLeFECmETX1L2EffHMe2kEPk7yaISAGxyy_LznN92TDe4cbEP377xFbH7bZBL9-D40EYyzxwdMtPS74gnkx9lI8k5BbsHF8qN_c7W4ma58hj85VKgLajqMzANKP_Fo-eYVE37HCc4qnaBD5_YFeFtA",
    place_id: "ChIJR760Uk2GhYARqZOGfcMz31U",
    num_ratings: 5192,
    price: 0,
  },
  {
    name: "Fisherman's Wharf",
    rating: 4.5,
    address: "2801 Leavenworth St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jk3UApHFlTaJMsw4ppSnlse_KnPoI61NtDVYTwoyrUUhMI8KTl20l7RCQKvBM7coReiaIxw_xSqX4mLsk3V8ay-gc148EtOG_nRfj-mCGF7OGY8Qn-nNhMOV6eqi_rBgLVZkunLzVC7DfU9vE5e72wu4xC_8ftgZHj8AwrI8dKbTMCA",
    place_id: "ChIJIbjkBuOAhYAR3OzY8Djb7Kc",
    num_ratings: 8603,
    price: 0,
  },
  {
    name: "de Young Museum",
    rating: 4.6,
    address:
      "50 Hagiwara Tea Garden Dr, San Francisco, CA 94118, United States",
    photo_reference:
      "AUjq9jnPD4ipCR25HArXuxPsZuiy4YlFH-2NllnTbv0TylkqRLtxiUcJ_rUlKxmJcSvWVqgC73o9-u1dc2yVm6jOdWkS6xFwDItAUFpSD6zbppoaOoUeEQeQU9t7VFGqKp4Eg8uQBmqIx9fjuKrpBwqwAvx035oXoqITgS1VqnoXgNqDYU0n",
    place_id: "ChIJI7NivpmAhYARSuRPlbbn_2w",
    num_ratings: 7081,
    price: 25,
  },
  {
    name: "Sutro Heights",
    rating: 4.7,
    address: "846 Point Lobos Ave, San Francisco, CA 94121, United States",
    photo_reference:
      "AUjq9jmK1xTkEM3VOHyZmww0OLptmRMsVlPVlEQx-K8Up17tUF_wGb3VTsQRNcqjQtgtwzNwKYC8P8waxH_OmCalBzYmF1vH2KbuphUWCyk088vgsV6utHZiSB_Om4xqBnVcUUwPZwEvdXDPWtIUxwiWLwwsV0tWda3_mYQOvx6siuD0aRQG",
    place_id: "ChIJ-U68LrSHhYARWgGKnK3Bc14",
    num_ratings: 1621,
    price: 0,
  },
  {
    name: "Mission Dolores Park",
    rating: 4.7,
    address: "Dolores St &, 19th St, San Francisco, CA 94114, United States",
    photo_reference:
      "AUjq9jnpafWojztU0ljYkMzoHk-hy7TOfi4YnLD9hRv4NuHgvVMTL1OfZU9i3frPnl3f9CIFWVIwiPXtHodOTqBSbI-tUK_BlbkxzeU20WKr4ytU7FHBxbpURtOks36nJqyWotdv7Rh6t9di_z8XP3q9bKditkRf0lwwSmamK_vKPPXWGwrs",
    place_id: "ChIJp3CqeRd-j4ARYI0i8e_kGKY",
    num_ratings: 13057,
    price: 0,
  },
  {
    name: "Fort Point National Historic Site",
    rating: 4.7,
    address: "201 Marine Dr, San Francisco, CA 94129, United States",
    photo_reference:
      "AUjq9jlYgo4HShAW2CsdYqWJplBzePve3EnSP3xfuBYEl-XYg-w_F05nrVoUbVBTAOtIgCkhT0O_e-UWcp7j6Y0fz154nXfZfyvNfT2nwAZl9tse9VB5vpY1UPrz5EgFG0QsRRxlIwTr4Tkyb56WF4C-VRKxVv6lq6aiozMA-YGU8L3zMNhh",
    place_id: "ChIJ_fRRLeqGhYAROWsCl5027X8",
    num_ratings: 2916,
    price: 0,
  },
  {
    name: "Grandview Park",
    rating: 4.8,
    address: "1705 14th Ave, San Francisco, CA 94122, United States",
    photo_reference:
      "AUjq9jnnGF5e-pZrhVTKdbA0LYnJN9Ile_E6WKDPG00DJesK3HvTwi-ylIiIy2Y9hsFhRJ9k4UBFapIeHFCU6CfOFpkk7JSEbtRsOhIWK7RZNMp8pv2BrxiFMeajgjg4PJffE6G39uo3BR0VujN5lHftf54nADFIXHRJd21hn08FBtsZVT4b",
    place_id: "ChIJFS16LmCHhYAR9-5CGavbV2k",
    num_ratings: 825,
    price: 0,
  },
  {
    name: "Hamon Observation Tower",
    rating: 4.8,
    address:
      "50 Hagiwara Tea Garden Dr, San Francisco, CA 94118, United States",
    photo_reference:
      "AUjq9jkbBQUKmxSq7G24cIuahgK87Ji67hLG0Ftw1qBPzdbW96WcVeMAzA02iSU3yaQD3h_TkKJTM4L0jdCIoOQHNHKtjIXyh_98rWqxcMsUEexBJ7zHjsEFomBCtHxOILTd89VmDk9XjXNjYE_BC48jo7xXFKTvjA2DxSwZn6JDEurhFJkc",
    place_id: "ChIJITNC7kGHhYARDRE7mPlUhfU",
    num_ratings: 210,
    price: 0,
  },
];

const dummy_hotels = [
  {
    name: "Hilton San Francisco Financial District",
    rating: 3.9,
    address: "750 Kearny St, San Francisco, CA 94108, United States",
    photo_reference:
      "AUjq9jmLhbfpj2bMxDgeOEMk9v_RUV2w5YKuJDbEB54ls5okZ7oRWCCsbk21LovMVGprJzJ4R-LZNx2ERGCCefcQobIvhyQUxvD858A3HI1Ubqk7CIFiaRRxv1KEL0PugzpxdfcNNTfetK6gHv9KzrM3n72KeQlBk7f678J_zGafonSerTSk",
    place_id: "ChIJOzt_KIuAhYARNdt9T_gCmKQ",
    num_ratings: 4696,
    price: 180,
  },
  {
    name: "Hotel Kabuki - JDV by Hyatt",
    rating: 4.2,
    address: "1625 Post St, San Francisco, CA 94115, United States",
    photo_reference:
      "AUjq9jkBean2K6aBNk-WXvCPTFHqTOb7a8KHVUltBe5H5gRo7f7J4LHSwP-Ky4jjMgxzjLtaUR6Et4DI_0j59febo4U_zRW1qIVIAN2isFYksPqvRGg4cPOB9Z0XnsQZvzYCgc-R-mxzJ9QSqYMnbuCjOHVkCLAf2pRKVJ9S6rK2_NaJMO6a",
    place_id: "ChIJr1x3276AhYARrjGvC3BSTfk",
    num_ratings: 1494,
    price: 180,
  },
  {
    name: "Hyatt Regency San Francisco",
    rating: 4.4,
    address: "5 Embarcadero Ctr, San Francisco, CA 94111, United States",
    photo_reference:
      "AUjq9jnNTn7NiuENBqUCcoms0DTvjuR6AjeXzfw8uJSFxMRHnGtFu1FyI8KS8MvANYzxWUZw55WDZJwYqiFZNGd6ay0R0Ulz8MFqH1Ktu43FoFQfaEMvn_DjTKnBCtmMJTp8iB8cdimSADSerBJ1XJ_7uQoz1yeZx3Hlc946jEJuKF88qxHh",
    place_id: "ChIJX2AfTWGAhYARK51ADFAMZoQ",
    num_ratings: 6284,
    price: 180,
  },
  {
    name: "Marriott Vacation Club Pulse, San Francisco",
    rating: 4.3,
    address: "2620 Jones St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jnnIUmEOz0V35ct3jaF2sLLwtlgTi9jlewW3DiAv-6DulbIoT_QS6ZCreHn7qraGbEQdqCTOHyj8WbA0mCT1OQklP_izzBPu6NQM01Bm7YPdTCIXWUhweAn8ae_3yXMT6nxUjBS6s30HGHKP2vGnvnspE6Co5EqhgbSTon1I-ZIFMoe",
    place_id: "ChIJB94owUaBhYARWjkY789mnkg",
    num_ratings: 331,
    price: 180,
  },
  {
    name: "Grand Hyatt San Francisco",
    rating: 4.4,
    address: "345 Stockton St, San Francisco, CA 94108, United States",
    photo_reference:
      "AUjq9jkbAuLBgdh3JBmwgz1-JumS9ghDNR1GyJOvFjNMYmpcy-YMKn28azneaoNG2Ze0ZDvTTfFJYCeNF0Bysax2913JlFOJzGv3O1yIca7VMvAhTRXMuOTmur6EeQ831a2BaGc7IXKXyq2yKA9n_zQI34rjGwZNgqVWLZdHx1LosuwTut7j",
    place_id: "ChIJv01Os46AhYARz43hFvD0kCQ",
    num_ratings: 3479,
    price: 180,
  },
  {
    name: "Holiday Inn San Francisco-Golden Gateway, an IHG Hotel",
    rating: 4,
    address: "1500 Van Ness Ave, San Francisco, CA 94109, United States",
    photo_reference:
      "AUjq9jnHeHQwF1QOkBGHruczC0ZWCbldQHUcGY4fia5dQ0YQLD4WdEMfHbHEAC2Jkc_oqihqcJUfOAhCnNoR4Zg8JrrAP-ncsBjxg--FPvbO2PKqCSZpYjcRuyHy9Vpac4uwcWo2V84gHlmR1Y-T7cBdQ2yhPLdS2Cl8vFRG_qN70I7potqE",
    place_id: "ChIJg0kwO5WAhYARkWsOYoycC_g",
    num_ratings: 3026,
    price: 120,
  },
  {
    name: "Hyatt Centric Fisherman's Wharf San Francisco",
    rating: 4.2,
    address: "555 North Point St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jnEtf_Frs1ipgTxtKNDSD4gbQqKBxc1jKBtlofG5jBEyQbp8DbNSBA28QLR4aoXb7inVZ0jInfV-Gkzil3HURuFe86CJge6yzW4k4OniBWp6ISv3KTmCaHfYK9HAQpJsJ-7074MvNVjvfFDAF3ms3HLHvEdsc5lt4wdjSDXjr94aLn-",
    place_id: "ChIJpVWaeeSAhYARu4S3Sa4Jc20",
    num_ratings: 2504,
    price: 180,
  },
  {
    name: "San Francisco Marriott Fisherman's Wharf",
    rating: 4.2,
    address: "1250 Columbus Ave, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jlg3D0Asbm54d7OXypAU-bgJB6pCH0eRJwEOfOezzeLpij_cMaOhhEVhDb_rch4mCrq_xynTTo5n44RFZDrpGplDGOJJqS7bDQRO4z6bk0bNW_yebZgFqkxMaLhwP4EO44wrqd1TKpCpujPnVEr25Rr3hw-ce2r803NFt9_f4-4S2BZ",
    place_id: "ChIJxS5qD-SAhYARTQg2CebPURY",
    num_ratings: 1560,
    price: 180,
  },
  {
    name: "Hilton San Francisco Union Square",
    rating: 4.2,
    address: "333 O'Farrell St, San Francisco, CA 94102, United States",
    photo_reference:
      "AUjq9jk6dxDTgen3sxMEKIhFJt15yvJaEDVrkbMSKa5C7-wDVb7o7G4JiygBSnbBVDzo0Vx8Q4qZkz6JoMrBnJ-ak1gWL5wf16mNkKEUp4FNj1J53Iad-ayljex1nrdtyqrYKn_avMenKMlTnXF-B72UsmiIjevkt6ohEml_-8ROvfUGjzFi",
    place_id: "ChIJeSJHoI-AhYARembxZUVcNEk",
    num_ratings: 10114,
    price: 180,
  },
  {
    name: "Holiday Inn Express & Suites San Francisco Fishermans Wharf, an IHG Hotel",
    rating: 4.2,
    address: "550 North Point St, San Francisco, CA 94133, United States",
    photo_reference:
      "AUjq9jmuJRSW0qOMHAKUSxdeSCJSwmwuVtUjb70qXcli9G9_-MuMznx9KWDEYVPoiVFQIVxdYJuUo96Dy_fYpkYVF8BOy1oPFggRSyGrlrcYCMxhK8ESoIBvg0TGQfLvkBUug2tsNdAxkAADT6eiRu16VXa5Fba9y9_QG0BuI958rQrvloZF",
    place_id: "ChIJyavVeeSAhYAR7xGAp4wD-a0",
    num_ratings: 1584,
    price: 120,
  },
];

const tripListMaker = async (
  hotels,
  attractions,
  restaurants,
  budget,
  num_days
) => {
  const randint = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  let stars_multiplier = 200;
  let mile_price_constant = 0.65;
  let possibleCombs = 2000;
  let possibleItineraries = [];

  for (let i = 0; i < possibleCombs; i++) {
    let restaurantsCopy = [...restaurants];
    let attractionsCopy = [...attractions];
    let hotelIndex = randint(0, hotels.length - 1);
    let currentItinerary = [];
    let total_price = 0;
    let total_likeability = 0;
    for (let j = 0; j < num_days; j++) {
      let attractionIndex = randint(0, attractionsCopy.length - 1);
      let restaurantIndex1 = randint(0, restaurantsCopy.length - 1);
      let restaurantIndex2 = randint(0, restaurantsCopy.length - 1);
      //duplication fixer
      if (restaurantIndex2 == restaurantIndex1) {
        restaurantIndex2 = randint(0, restaurantsCopy.length - 1);
      }
      if (restaurantIndex2 == restaurantIndex1) {
        restaurantIndex2 = randint(0, restaurantsCopy.length - 1);
      }

      let randomized_attraction_price = randint(10, 25);
      randomized_attraction_price =
        randomized_attraction_price - (randomized_attraction_price % 5);

      let daily_price =
        randomized_attraction_price +
        restaurantsCopy[restaurantIndex1].price +
        restaurantsCopy[restaurantIndex2].price;

      total_price += daily_price;

      let likeability =
        attractionsCopy[attractionIndex].rating * 2 * stars_multiplier +
        restaurantsCopy[restaurantIndex1].rating * stars_multiplier +
        restaurantsCopy[restaurantIndex2].rating * stars_multiplier +
        attractionsCopy[attractionIndex].num_ratings * 2 +
        restaurantsCopy[restaurantIndex1].num_ratings +
        restaurantsCopy[restaurantIndex2].num_ratings;

      total_likeability += likeability;

      currentItinerary.push({
        activity: attractionsCopy[attractionIndex],
        restaurant_1: restaurantsCopy[restaurantIndex1],
        restaurant_2: restaurantsCopy[restaurantIndex2],
        daily_price: daily_price,
        likeability: likeability,
      });
      attractionsCopy.splice(attractionIndex, 1);
      restaurantsCopy.splice(restaurantIndex1, 1);
      restaurantsCopy.splice(restaurantIndex2, 1);
    }

    total_price += hotels[hotelIndex].price * num_days;
    total_likeability +=
      (hotels[hotelIndex].rating * stars_multiplier +
        hotels[hotelIndex].num_ratings) *
      num_days;
    if (total_price <= budget) {
      possibleItineraries.push({
        hotel: hotels[hotelIndex],
        itinerary: currentItinerary,
        total_price: total_price,
        total_likeability: total_likeability,
      });
    }
  }

  possibleItineraries.sort((a, b) => b.total_likeability - a.total_likeability);
  if (possibleItineraries.length == 0) {
    console.log("No possible itineraries");
    return null;
  }

  // console.log(possibleItineraries[0]);

  let allActivitesAddresses = [];
  for (let i = 0; i < possibleItineraries[0].itinerary.length; i++) {
    allActivitesAddresses.push(
      possibleItineraries[0].itinerary[i].activity.address
    );
    allActivitesAddresses.push(
      possibleItineraries[0].itinerary[i].restaurant_1.address
    );
    allActivitesAddresses.push(
      possibleItineraries[0].itinerary[i].restaurant_2.address
    );
  }
  let activitiesString = allActivitesAddresses.join("|");

  const params = {
    origins: possibleItineraries[0].hotel.address,
    destinations: activitiesString,
    key: "AIzaSyDGrrBMexF85xA4aBVabFBFv9DqSl8lutQ",
  };

  //   https://maps.googleapis.com/maps/api/distancematrix/json
  //   ?destinations=New%20York%20City%2C%20NY
  //   &origins=Washington%2C%20DC%7CBoston
  //   &units=imperial
  //   &key=YOUR_API_KEY

  let google_dm_api_endpoint =
    "https://maps.googleapis.com/maps/api/distancematrix/json?";

  const response = await axios.get(google_dm_api_endpoint, { params });

  let trip_distance = 0;
  let trip_time = 0;
  for (let i = 0; i < possibleItineraries[0].itinerary.length; i++) {
    attractionDistanceString =
      response.data.rows[0].elements[3 * i].distance.text;
    restaurant_1_DistanceString =
      response.data.rows[0].elements[3 * i + 1].distance.text;
    restaurant_2_DistanceString =
      response.data.rows[0].elements[3 * i + 2].distance.text;

    attractionDistanceValue = parseFloat(
      attractionDistanceString.split(" ")[0]
    );
    restaurant_1_DistanceValue = parseFloat(
      restaurant_1_DistanceString.split(" ")[0]
    );
    restaurant_2_DistanceValue = parseFloat(
      restaurant_2_DistanceString.split(" ")[0]
    );

    totalDailyDistanceKM =
      attractionDistanceValue * 2 +
      restaurant_1_DistanceValue * 2 +
      restaurant_2_DistanceValue * 2;

    total_daily_distance = totalDailyDistanceKM * 0.621371;
    trip_distance += total_daily_distance;
    possibleItineraries[0].itinerary[i].daily_distance_miles =
      total_daily_distance;

    attractionDurationString =
      response.data.rows[0].elements[3 * i].duration.text;
    restaurant_1_DurationString =
      response.data.rows[0].elements[3 * i + 1].duration.text;
    restaurant_2_DurationString =
      response.data.rows[0].elements[3 * i + 2].duration.text;

    attractionDurationValue = parseFloat(
      attractionDurationString.split(" ")[0]
    );
    restaurant_1_DurationValue = parseFloat(
      restaurant_1_DurationString.split(" ")[0]
    );
    restaurant_2_DurationValue = parseFloat(
      restaurant_2_DurationString.split(" ")[0]
    );

    totalDailyDurationMin =
      attractionDurationValue * 2 +
      restaurant_1_DurationValue * 2 +
      restaurant_2_DurationValue * 2;

    trip_time += totalDailyDurationMin;

    possibleItineraries[0].itinerary[i].daily_duration_minutes =
      totalDailyDurationMin;
  }
  possibleItineraries[0].trip_distance_miles = trip_distance;
  possibleItineraries[0].trip_time_hours = trip_time / 60;

  return possibleItineraries[0];
};

//tripListMaker(dummy_hotels, dummy_attractions, dummy_restaurants, 1000, 3);

//export my functions
module.exports = { tripListMaker };

// List of Things to implement
// 1. Add a way to get the distance between hotel and activity
// Add the Musuem, Park, Theme_park, and max_distance from hotel
