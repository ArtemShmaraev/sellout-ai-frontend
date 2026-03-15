import MainLayout from "@/layout/MainLayout";
import styles from '@/styles/CatalogSneakersMobileMen.module.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import logo from "@/static/img/sellout_logo.svg";
import backLogo from "@/static/icons/chevron-left.svg";
import cross from '@/static/icons/x-lg.svg'
import Link from "next/link";
import Cookies from "js-cookie";

const CatalogSneakersMobile = ({handleClose, handleOpenSection}) => {
    const linksCategoriesM = [
        "/products?category=sneakers&category=canvas_shoes",
        "/products?category=high_top_sneakers",
        "/products?category=low_top_sneakers",
        "/products?category=basketball_sneakers",
        "/products?category=football_boots",
        "/products?category=other_sport_shoes"
    ];

    const linksCategoriesW = [
        "/products?category=sneakers&category=canvas_shoes",
        "/products?category=sneakers",
        "/products?category=canvas_shoes",
        "/products?category=high_top_sneakers",
        "/products?category=low_top_sneakers",
        "/products?category=other_sport_shoes&category=basketball_sneakers"
    ];

    const linksBrandsM = [
        '/products?line=nike&category=sneakers&category=canvas_shoes',
        '/products?line=jordan&category=sneakers&category=canvas_shoes',
        '/products?line=vans&category=sneakers&category=canvas_shoes',
        '/products?line=li-ning&category=sneakers&category=canvas_shoes',
        '/products?line=off-white&category=sneakers&category=canvas_shoes',
        '/products?line=vetements&category=sneakers&category=canvas_shoes',
        '/products?line=balenciaga&category=sneakers&category=canvas_shoes',
        '/products?line=a_bathing_ape®&category=sneakers&category=canvas_shoes',
        '/products?line=asics&category=sneakers&category=canvas_shoes',
        '/products?line=puma&category=sneakers&category=canvas_shoes',
        '/products?line=maison_margiela&category=sneakers&category=canvas_shoes',
        '/products?line=gucci&category=sneakers&category=canvas_shoes',
        '/products?line=adidas&category=sneakers&category=canvas_shoes',
        '/products?line=new_balance&category=sneakers&category=canvas_shoes',
        '/products?line=converse&category=sneakers&category=canvas_shoes',
        '/products?line=under_armour&category=sneakers&category=canvas_shoes',
        '/products?line=alexander_mcqueen&category=sneakers&category=canvas_shoes',
        '/products?line=dior&category=sneakers&category=canvas_shoes',
        '/products?line=prada&category=sneakers&category=canvas_shoes',
        '/products?line=louis_vuitton&category=sneakers&category=canvas_shoes',
        '/products?line=reebok&category=sneakers&category=canvas_shoes',
        '/products?line=anta&category=sneakers&category=canvas_shoes',
        '/products?line=valentino&category=sneakers&category=canvas_shoes',
        '/products?line=lanvin&category=sneakers&category=canvas_shoes',
    ];

    const linksBrandsW = [
        '/products?line=nike&category=sneakers&category=canvas_shoes',
        '/products?line=jordan&category=sneakers&category=canvas_shoes',
        '/products?line=vans&category=sneakers&category=canvas_shoes',
        '/products?line=li-ning&category=sneakers&category=canvas_shoes',
        '/products?line=off-white&category=sneakers&category=canvas_shoes',
        '/products?line=vetements&category=sneakers&category=canvas_shoes',
        '/products?line=balenciaga&category=sneakers&category=canvas_shoes',
        '/products?line=a_bathing_ape®&category=sneakers&category=canvas_shoes',
        '/products?line=asics&category=sneakers&category=canvas_shoes',
        '/products?line=puma&category=sneakers&category=canvas_shoes',
        '/products?line=maison_margiela&category=sneakers&category=canvas_shoes',
        '/products?line=gucci&category=sneakers&category=canvas_shoes',
        '/products?line=adidas&category=sneakers&category=canvas_shoes',
        '/products?line=new_balance&category=sneakers&category=canvas_shoes',
        '/products?line=converse&category=sneakers&category=canvas_shoes',
        '/products?line=under_armour&category=sneakers&category=canvas_shoes',
        '/products?line=alexander_mcqueen&category=sneakers&category=canvas_shoes',
        '/products?line=dior&category=sneakers&category=canvas_shoes',
        '/products?line=prada&category=sneakers&category=canvas_shoes',
        '/products?line=louis_vuitton&category=sneakers&category=canvas_shoes',
        '/products?line=reebok&category=sneakers&category=canvas_shoes',
        '/products?line=anta&category=sneakers&category=canvas_shoes',
        '/products?line=valentino&category=sneakers&category=canvas_shoes',
        '/products?line=lanvin&category=sneakers&category=canvas_shoes',
    ];

    const amountsBrandsM = [
        "32'400 лотов",
        "6'000 лотов",
        "7'200 лотов",
        "800 лотов",
        "2'100 лотов",
        "1'000 лотов",
        "1'800 лотов",
        "1'400 лотов",
        "11'700 лотов",
        "9'000 лотов",
        "1'200 лотов",
        "1'200 лотов",
        "25'800 лотов",
        "9'000 лотов",
        "4'800 лотов",
        "1'500 лотов",
        "1'800 лотов",
        "900 лотов",
        "900 лотов",
        "800 лотов",
        "3'900 лотов",
        "1'000 лотов",
        "1'800 лотов",
        "900 лотов"
    ];

    const amountsBrandsW = [
        "32'400 лотов",
        "6'000 лотов",
        "7'200 лотов",
        "900 лотов",
        "2'100 лотов",
        "700 лотов",
        "1'800 лотов",
        "700 лотов",
        "11'700 лотов",
        "9'000 лотов",
        "1'200 лотов",
        "1'200 лотов",
        "25'800 лотов",
        "9'000 лотов",
        "4'800 лотов",
        "1'500 лотов",
        "1'800 лотов",
        "900 лотов",
        "900 лотов",
        "1'200 лотов",
        "3'900 лотов",
        "700 лотов",
        "1'800 лотов",
        "900 лотов"
    ];


    const textsBrandsNikeM = [
        'Nike Dunk', 'Nike Air Force 1', 'Nike Blazer', 'Nike Cortez', 'Nike Air Max 95', 'Nike Air Max 97', 'Nike React', 'Nike V2K', 'Nike M2K', 'Air Monarch', 'Nike Foamposite', 'Air Uptempo', 'Nike Air Presto', 'Air Huarache', 'Nike Hyperdunk', 'Air Max Fusion', 'Nike Waffle', 'Nike Zoom', 'Nike Court Vision', 'Nike Blazer Low', 'Nike Dunk Low', 'Nike Dunk Mid', 'Nike Dunk High', 'Nike Air Max 1', 'Nike Air Max 90', 'Zoom Voomero', 'LeBron James', 'Kobe Bryant', 'Kyrie Irving', 'Kevin Durant', 'Nike Air Trainer', 'Nike Air Flight', 'Nike Air Max 98', 'Air Max Plus', 'Nike VaporMax', 'Nike Air Max 270', 'Nike Air Max 720', 'Freak Giannis', 'Zoom G.T.', 'Ja Morant', 'Paul George', 'Court Borough', 'Nike Blazer Mid', 'Air Force 1 Low', 'Air Force 1 Mid', 'Air Force 1 High'
    ];

    const linksNikeM = [
        "/products?line=nike_dunk", "/products?line=nike_air_force_1", "/products?line=nike_blazer", "/products?line=nike_cortez", "/products?line=nike_air_max_95", "/products?line=nike_air_max_97", "/products?line=nike_react", "/products?line=nike_v2k", "/products?line=nike_m2k", "/products?line=nike_air_monarch", "/products?line=nike_foamposite", "/products?line=nike_air_more_uptempo", "/products?line=nike_air_presto", "/products?line=nike_air_huarache", "/products?line=nike_hyperdunk", "/products?line=nike_air_max_fusion", "/products?line=nike_waffle", "/products?line=nike_zoom", "/products?line=nike_court_vision", "/products?line=nike_blazer_low", "/products?line=nike_dunk_low", "/products?line=nike_dunk_mid", "/products?line=nike_dunk_high", "/products?line=nike_air_max_1", "/products?line=nike_air_max_90", "/products?line=zoom_voomero", "/products?line=nike_lebron_james", "/products?line=nike_kobe_bryant", "/products?line=nike_kyrie_irving", "/products?line=nike_kd_%28kevin_durant%29", "/products?line=nike_air_trainer", "/products?line=nike_air_flight", "/products?line=nike_air_max_98", "/products?line=nike_air_max_plus", "/products?line=nike_vapormax", "/products?line=nike_air_max_270", "/products?line=nike_air_max_720", "/products?line=nike_freak_%28giannis_antetokounmpo%29", "/products?line=nike_air_zoom_g.t.", "/products?line=nike_ja_morant", "/products?line=nike_pg_%28paul_george%29", "/products?line=nike_court_borough", "/products?line=nike_blazer_mid", "/products?line=nike_air_force_1_low", "/products?line=nike_air_force_1_mid", "/products?line=nike_air_force_1_high"];

    const textsBrandsJordanM = [
        'Air Jordan 1 High', 'Air Jordan 1 Mid', 'Air Jordan 1 Low', 'Air Jordan 5', 'Air Jordan 7', 'Air Jordan 11', 'Air Jordan 13', 'Air Jordan 32', 'Air Jordan 33', 'Air Jordan 34', 'Luka Doncic', 'Zion Williamson', 'Air Jordan 2', 'Air Jordan 3', 'Air Jordan 4', 'Air Jordan 6', 'Air Jordan 8', 'Air Jordan 12', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 37', 'Air Jordan 38', 'Jayson Tatum', 'Why Not'
    ];

    const linksJordanM = [
        "/products?line=air_jordan_1_high", "/products?line=air_jordan_1_mid", "/products?line=air_jordan_1_low", "/products?line=air_jordan_5", "/products?line=air_jordan_7", "/products?line=air_jordan_11", "/products?line=air_jordan_13", "/products?line=air_jordan_32", "/products?line=air_jordan_33", "/products?line=air_jordan_34", "/products?line=jordan_luka", "/products?line=jordan_zion", "/products?line=air_jordan_2", "/products?line=air_jordan_3", "/products?line=air_jordan_4", "/products?line=air_jordan_6", "/products?line=air_jordan_8", "/products?line=air_jordan_12", "/products?line=air_jordan_35", "/products?line=air_jordan_36", "/products?line=air_jordan_37", "/products?line=air_jordan_38", "/products?line=jordan_tatum", "/products?line=jordan_why_not"];

    const textsBrandsNewBalanceM = [
        'New Balance 237', 'NB 2002R', 'New Balance 550', 'New Balance 530', 'New Balance 580', 'New Balance 57/40', 'New Balance 991', 'New Balance 993', 'New Balance 327', 'NB 1906R', 'NB 9060', 'New Balance 650', 'New Balance 574', 'New Balance 990', 'New Balance 992', 'New Balance 997'
    ];

    const linksNewBalanceM = [
        "/products?line=new_balance_237", "/products?line=new_balance_2002r", "/products?line=new_balance_550", "/products?line=new_balance_530", "/products?line=new_balance_580", "/products?line=new_balance_57%2F40", "/products?line=new_balance_991", "/products?line=new_balance_993", "/products?line=new_balance_327", "/products?line=new_balance_1906r", "/products?line=new_balance_9060", "/products?line=new_balance_650", "/products?line=new_balance_574", "/products?line=new_balance_990", "/products?line=new_balance_992", "/products?line=new_balance_997"];

    const textsBrandsAdidasM = [
        'Yeezy 350', 'Yeezy 500', 'Yeezy 700', 'adidas Gazelle', 'adidas Forum', 'adidas Spezial', 'Yeezy 380', 'adidas adimatic', 'adidas 4D', 'adidas Adilette', 'Foam Runner', 'adidas Rivalry', 'Yeezy 450', 'adidas EQT', 'adidas Superstar', 'adidas Deerupt', 'adidas Ozelia', 'Damian Lillard', 'Derrick Rose', 'adidas Nizza', 'adidas Samba', 'Human Race', 'adidas Campus', 'Yeezy Slide', 'adidas NMD', 'adidas SL', 'James Harden', 'Nite Jogger', 'Trae Young', 'Stan Smith', 'adidas Ultraboost', 'adidas Falcon', 'Continental', 'adidas Ozweego', 'adidas ZX', 'adidas Hamburg', 'adidas Tubular', 'Pro Bounce', 'adidas D.O.N', 'Yeezy 750'
    ];

    const linksAdidasM = [
        "/products?line=adidas_yeezy_350", "/products?line=adidas_yeezy_500", "/products?line=adidas_yeezy_700", "/products?line=adidas_gazelle", "/products?line=adidas_forum", "/products?line=adidas_spezial", "/products?line=adidas_yeezy_380", "/products?line=adidas_adimatic", "/products?line=adidas_4d", "/products?line=adidas_adilette", "/products?line=adidas_yeezy_foam_runner", "/products?line=adidas_rivalry", "/products?line=adidas_yeezy_450", "/products?line=adidas_eqt", "/products?line=adidas_superstar", "/products?line=adidas_deerupt", "/products?line=adidas_ozelia", "/products?line=adidas_dame_%28damian_lillard%29", "/products?line=adidas_d_rose", "/products?line=adidas_nizza", "/products?line=adidas_samba", "/products?line=adidas_human_race", "/products?line=adidas_campus", "/products?line=adidas_yeezy_slide", "/products?line=adidas_nmd", "/products?line=adidas_sl", "/products?line=adidas_harden", "/products?line=adidas_nite_jogger", "/products?line=adidas_trae_young", "/products?line=adidas_stan_smith", "/products?line=adidas_ultraboost", "/products?line=adidas_falcon", "/products?line=adidas_continental", "/products?line=adidas_ozweego", "/products?line=adidas_zx", "/products?line=adidas_hamburg", "/products?line=adidas_tubular", "/products?line=adidas_pro_bounce", "/products?line=adidas_d.o.n", "/products?line=adidas_yeezy_750"];

    const textsBrandsVansM = [
        'Vans Knu Skool', 'Vans Old Skool', 'Vans Half Cab', 'Vans ComfyCush', 'Vans Style 36', 'Vans SK8', 'Vans Era', 'Vans Slip-on', 'Vans Authentic', 'Vans Ward'
    ];

    const linksVansM = [
        "/products?line=vans_knu", "/products?line=vans_old_skool", "/products?line=vans_half_cab", "/products?line=vans_comfycush", "/products?line=vans_style_36", "/products?line=vans_sk8", "/products?line=vans_era", "/products?line=vans_slip-on", "/products?line=vans_authentic", "/products?line=vans_ward"];

    const textsBrandsAsicsM = [
        'Asics Gel-NYC', 'Asics Gel-Lyte', 'Magic Speed', 'Asics Gel-Kahana', 'Gel-Cumulus', 'Gel-Contend', 'Asics Gel-Kayano', 'Asics Gel-1130', 'Gel-Quantum', 'Asics Gel-Nimbus', 'Asics Gel-Flux', 'Asics Gel-1090', 'Asics Gel-Excite', 'Asics GT'
    ];

    const linksAsicsM = [
        "/products?line=asics_gel-nyc", "/products?line=asics_gel-lyte", "/products?line=asics_magic_speed", "/products?line=asics_gel-kahana", "/products?line=asics_gel-cumulus", "/products?line=asics_gel-contend", "/products?line=asics_gel-kayano", "/products?line=asics_gel-1130", "/products?line=asics_gel-quantum", "/products?line=asics_gel-nimbus", "/products?line=asics_gel-flux", "/products?line=asics_gel-1090", "/products?line=asics_gel-excite", "/products?line=asics_gt"];

    const textsBrandsConverseM = [
        'Chuck Taylor', 'One Star', 'Converse BB', 'Pro Leather', 'Run Star'
    ];

    const linksConverseM = [
        "/products?line=converse_chuck_taylor", "/products?line=converse_one_star", "/products?line=converse_all_star_pro_bb", "/products?line=converse_pro_leather", "/products?line=converse_chuck_taylor_run_star"];

    const textsBrandsAntaM = [
        'Anta KT3', 'Anta KT7', 'Anta KT8'
    ];

    const linksAntaM = [
        "/products?line=anta_kt3", "/products?line=anta_kt7", "/products?line=anta_kt8"];

    const textsBrandsLiNingM = [
        'Way Of Wade', 'Yushuai', 'Sonic', 'Speed'
    ];

    const linksLiNingM = [
        "/products?line=li-ning_way_of_wade", "/products?line=li-ning_yushuai", "/products?line=li-ning_sonic", "/products?line=li-ning_speed"];

    const textsBrandsPumaM = [
        'Puma MB', 'Ralph Sampson', 'Puma Mirage', 'Puma Suede', 'Puma Smash', 'Puma Ca Pro', 'Puma Slipstream', 'Puma RS', 'Puma Fusion', 'Future Rider', 'Puma Cali', 'Puma Roma', 'Puma Clyde', 'Puma Mayze', 'Puma Carina', 'Puma Ignite'
    ];

    const linksPumaM = [
        "/products?line=puma_mb", "/products?line=puma_ralph_sampson", "/products?line=puma_mirage", "/products?line=puma_suede", "/products?line=puma_smash", "/products?line=puma_ca_pro", "/products?line=puma_slipstream", "/products?line=puma_rs", "/products?line=puma_fusion", "/products?line=puma_future_rider", "/products?line=puma_cali", "/products?line=puma_roma", "/products?line=puma_clyde", "/products?line=puma_mayze", "/products?line=puma_carina", "/products?line=puma_ignite"];

    const textsBrandsReebokM = [
        'Reebok Club', 'Classic Leather', 'Instapump Fury', 'Reebok Workout', 'Zig Kinetica', 'Reebok Question'
    ];

    const linksReebokM = [
        "/products?line=reebok_club", "/products?line=reebok_classic_leather", "/products?line=reebok_instapump_fury", "/products?line=reebok_workout", "/products?line=reebok_zig_kinetica", "/products?line=reebok_question"];

    const textsBrandsUAM = [
        'UA Curry 4', 'UA Curry 6', 'UA Curry 7', 'UA Curry 1', 'UA Curry 2', 'UA Curry 8', 'UA Curry 9', 'UA Curry 10', 'UA Curry 3', 'UA Curry 5'
    ];

    const linksUAM = [
        "/products?line=under_armour_curry_4", "/products?line=under_armour_curry_6", "/products?line=under_armour_curry_7", "/products?line=under_armour_curry_1", "/products?line=under_armour_curry_2", "/products?line=under_armour_curry_8", "/products?line=under_armour_curry_9", "/products?line=under_armour_curry_10", "/products?line=under_armour_curry_3", "/products?line=under_armour_curry_5"];

    const textsBrandsAdidasW = [
        'adidas Samba', 'adidas Gazelle', 'adidas SL', 'Human Race', 'Yeezy 350', 'adidas Falcon', 'Yeezy 380', 'adidas adimatic', 'adidas 4D', 'adidas Adilette', 'Foam Runner', 'adidas Rivalry', 'Yeezy 450', 'adidas EQT', 'adidas Superstar', 'adidas Deerupt', 'adidas Ozelia', 'Damian Lillard', 'Derrick Rose', 'adidas Nizza', 'adidas Campus', 'adidas Spezial', 'adidas Forum', 'adidas NMD', 'Yeezy Slide', 'Stan Smith', 'Continental', 'Nite Jogger', 'Yeezy 500', 'Trae Young', 'adidas Ultraboost', 'James Harden', 'Yeezy 700', 'adidas Ozweego', 'adidas ZX', 'adidas Hamburg', 'adidas Tubular', 'Pro Bounce', 'adidas D.O.N', 'Yeezy 750'
    ];

    const linksAdidasW = [
        "/products?line=adidas_samba",
        "/products?line=adidas_gazelle",
        "/products?line=adidas_sl",
        "/products?line=adidas_human_race",
        "/products?line=adidas_yeezy_350",
        "/products?line=adidas_falcon",
        "/products?line=adidas_yeezy_380",
        "/products?line=adidas_adimatic",
        "/products?line=adidas_4d",
        "/products?line=adidas_adilette",
        "/products?line=adidas_yeezy_foam_runner",
        "/products?line=adidas_rivalry",
        "/products?line=adidas_yeezy_450",
        "/products?line=adidas_eqt",
        "/products?line=adidas_superstar",
        "/products?line=adidas_deerupt",
        "/products?line=adidas_ozelia",
        "/products?line=adidas_dame_%28damian_lillard%29",
        "/products?line=adidas_d_rose",
        "/products?line=adidas_nizza",
        "/products?line=adidas_campus",
        "/products?line=adidas_spezial",
        "/products?line=adidas_forum",
        "/products?line=adidas_nmd",
        "/products?line=adidas_yeezy_slide",
        "/products?line=adidas_stan_smith",
        "/products?line=adidas_continental",
        "/products?line=adidas_nite_jogger",
        "/products?line=adidas_yeezy_500",
        "/products?line=adidas_trae_young",
        "/products?line=adidas_ultraboost",
        "/products?line=adidas_harden",
        "/products?line=adidas_yeezy_700",
        "/products?line=adidas_ozweego",
        "/products?line=adidas_zx",
        "/products?line=adidas_hamburg",
        "/products?line=adidas_tubular",
        "/products?line=adidas_pro_bounce",
        "/products?line=adidas_d.o.n",
        "/products?line=adidas_yeezy_750"];

    const textsBrandsNikeW = [
        'Nike Dunk', 'Nike Air Force 1', 'Nike Blazer', 'Nike Cortez', 'Nike Air Max 95', 'Nike Zoom', 'Air Monarch', 'Nike Air Max 720', 'Nike Foamposite', 'Air Huarache', 'Nike Court Vision', 'Kyrie Irving', 'Kevin Durant', 'Nike Air Max 270', 'Nike Air Flight', 'Nike Air Trainer', 'Air Max Plus', 'Air Uptempo', 'Nike Hyperdunk', 'Nike Blazer Low', 'Nike Dunk Low', 'Nike Dunk Mid', 'Nike Dunk High', 'Nike Air Max 1', 'Nike Air Max 90', 'Zoom Voomero', 'Nike V2K', 'Nike Air Max 97', 'Nike React', 'Nike M2K', 'Nike VaporMax', 'Nike Air Max 98', 'Air Max Fusion', 'Nike Waffle', 'LeBron James', 'Kobe Bryant', 'Nike Air Presto', 'Freak Giannis', 'Zoom G.T.', 'Ja Morant', 'Paul George', 'Court Borough', 'Nike Blazer Mid', 'Air Force 1 Low', 'Air Force 1 Mid', 'Air Force 1 High'
    ];

    const linksNikeW = [
        "/products?line=nike_dunk",
        "/products?line=nike_air_force_1",
        "/products?line=nike_blazer",
        "/products?line=nike_cortez",
        "/products?line=nike_air_max_95",
        "/products?line=nike_zoom",
        "/products?line=nike_air_monarch",
        "/products?line=nike_air_max_720",
        "/products?line=nike_foamposite",
        "/products?line=nike_air_huarache",
        "/products?line=nike_court_vision",
        "/products?line=nike_kyrie_irving",
        "/products?line=nike_kd_%28kevin_durant%29",
        "/products?line=nike_air_max_270",
        "/products?line=nike_air_flight",
        "/products?line=nike_air_trainer",
        "/products?line=nike_air_max_plus",
        "/products?line=nike_air_more_uptempo",
        "/products?line=nike_hyperdunk",
        "/products?line=nike_blazer_low",
        "/products?line=nike_dunk_low",
        "/products?line=nike_dunk_mid",
        "/products?line=nike_dunk_high",
        "/products?line=nike_air_max_1",
        "/products?line=nike_air_max_90",
        "/products?line=nike_air_zoom_voomero",
        "/products?line=nike_v2k",
        "/products?line=nike_air_max_97",
        "/products?line=nike_react",
        "/products?line=nike_m2k",
        "/products?line=nike_vapormax",
        "/products?line=nike_air_max_98",
        "/products?line=nike_air_max_fusion",
        "/products?line=nike_waffle",
        "/products?line=nike_lebron_james",
        "/products?line=nike_kobe_bryant",
        "/products?line=nike_air_presto",
        "/products?line=nike_freak_%28giannis_antetokounmpo%29",
        "/products?line=nike_air_zoom_g.t.",
        "/products?line=nike_ja_morant",
        "/products?line=nike_pg_%28paul_george%29",
        "/products?line=nike_court_borough",
        "/products?line=nike_blazer_mid",
        "/products?line=nike_air_force_1_low",
        "/products?line=nike_air_force_1_mid",
        "/products?line=nike_air_force_1_high"];

    const textsBrandsJordanW = [
        'Air Jordan 1 High', 'Air Jordan 1 Mid', 'Air Jordan 1 Low', 'Air Jordan 5', 'Air Jordan 7', 'Air Jordan 11', 'Air Jordan 13', 'Air Jordan 32', 'Air Jordan 33', 'Air Jordan 34', 'Luka Doncic', 'Zion Williamson', 'Air Jordan 2', 'Air Jordan 3', 'Air Jordan 4', 'Air Jordan 6', 'Air Jordan 8', 'Air Jordan 12', 'Air Jordan 35', 'Air Jordan 36', 'Air Jordan 37', 'Air Jordan 38', 'Jayson Tatum', 'Why Not'
    ];

    const linksJordanW = [
        "/products?line=air_jordan_1_high", "/products?line=air_jordan_1_mid", "/products?line=air_jordan_1_low", "/products?line=air_jordan_5", "/products?line=air_jordan_7", "/products?line=air_jordan_11", "/products?line=air_jordan_13", "/products?line=air_jordan_32", "/products?line=air_jordan_33", "/products?line=air_jordan_34", "/products?line=jordan_luka", "/products?line=jordan_zion", "/products?line=air_jordan_2", "/products?line=air_jordan_3", "/products?line=air_jordan_4", "/products?line=air_jordan_6", "/products?line=air_jordan_8", "/products?line=air_jordan_12", "/products?line=air_jordan_35", "/products?line=air_jordan_36", "/products?line=air_jordan_37", "/products?line=air_jordan_38", "/products?line=jordan_tatum", "/products?line=jordan_why_not"];

    const textsBrandsNewBalanceW = [
        'New Balance 237', 'NB 2002R', 'New Balance 550', 'New Balance 530', 'New Balance 580', 'New Balance 57/40', 'New Balance 991', 'New Balance 993', 'New Balance 327', 'NB 1906R', 'NB 9060', 'New Balance 650', 'New Balance 574', 'New Balance 990', 'New Balance 992', 'New Balance 997'
    ];

    const linksNewBalanceW = [
        "/products?line=new_balance_237", "/products?line=new_balance_2002r", "/products?line=new_balance_550", "/products?line=new_balance_530", "/products?line=new_balance_580", "/products?line=new_balance_57%2F40", "/products?line=new_balance_991", "/products?line=new_balance_993", "/products?line=new_balance_327", "/products?line=new_balance_1906r", "/products?line=new_balance_9060", "/products?line=new_balance_650", "/products?line=new_balance_574", "/products?line=new_balance_990", "/products?line=new_balance_992", "/products?line=new_balance_997"];

    const textsBrandsConverseW = [
        'Chuck Taylor', 'One Star', 'Converse BB', 'Pro Leather', 'Run Star'
    ];

    const linksConverseW = [
        "/products?line=converse_chuck_taylor", "/products?line=converse_one_star", "/products?line=converse_all_star_pro_bb", "/products?line=converse_pro_leather", "/products?line=converse_chuck_taylor_run_star"];

    const textsBrandsVansW = [
        'Vans Knu Skool', 'Vans Old Skool', 'Vans Half Cab', 'Vans ComfyCush', 'Vans Style 36', 'Vans SK8', 'Vans Era', 'Vans Slip-on', 'Vans Authentic', 'Vans Ward'
    ];

    const linksVansW = [
        "/products?line=vans_knu", "/products?line=vans_old_skool", "/products?line=vans_half_cab", "/products?line=vans_comfycush", "/products?line=vans_style_36", "/products?line=vans_sk8", "/products?line=vans_era", "/products?line=vans_slip-on", "/products?line=vans_authentic", "/products?line=vans_ward"];

    const textsBrandsPumaW = [
        'Puma MB', 'Ralph Sampson', 'Puma Mirage', 'Puma Suede', 'Puma Smash', 'Puma Ca Pro', 'Puma Slipstream', 'Puma RS', 'Puma Fusion', 'Future Rider', 'Puma Cali', 'Puma Roma', 'Puma Clyde', 'Puma Mayze', 'Puma Carina', 'Puma Ignite'
    ];

    const linksPumaW = [
        "/products?line=puma_mb", "/products?line=puma_ralph_sampson", "/products?line=puma_mirage", "/products?line=puma_suede", "/products?line=puma_smash", "/products?line=puma_ca_pro", "/products?line=puma_slipstream", "/products?line=puma_rs", "/products?line=puma_fusion", "/products?line=puma_future_rider", "/products?line=puma_cali", "/products?line=puma_roma", "/products?line=puma_clyde", "/products?line=puma_mayze", "/products?line=puma_carina", "/products?line=puma_ignite"];

    const textsBrandsAsicsW = [
        'Asics Gel-NYC', 'Asics Gel-Lyte', 'Magic Speed', 'Asics Gel-Kahana', 'Gel-Cumulus', 'Gel-Contend', 'Asics Gel-Kayano', 'Asics Gel-1130', 'Gel-Quantum', 'Asics Gel-Nimbus', 'Asics Gel-Flux', 'Asics Gel-1090', 'Asics Gel-Excite', 'Asics GT'
    ];

    const linksAsicsW = [
        "/products?line=asics_gel-nyc", "/products?line=asics_gel-lyte", "/products?line=asics_magic_speed", "/products?line=asics_gel-kahana", "/products?line=asics_gel-cumulus", "/products?line=asics_gel-contend", "/products?line=asics_gel-kayano", "/products?line=asics_gel-1130", "/products?line=asics_gel-quantum", "/products?line=asics_gel-nimbus", "/products?line=asics_gel-flux", "/products?line=asics_gel-1090", "/products?line=asics_gel-excite", "/products?line=asics_gt"];

    const textsBrandsReebokW = [
        'Reebok Club', 'Classic Leather', 'Instapump Fury', 'Reebok Workout', 'Zig Kinetica', 'Reebok Question'
    ];

    const linksReebokW = [
        "/products?line=reebok_club", "/products?line=reebok_classic_leather", "/products?line=reebok_instapump_fury", "/products?line=reebok_workout", "/products?line=reebok_zig_kinetica", "/products?line=reebok_question"];

    const textsBrandsAntaW = [
        'Anta KT3', 'Anta KT7', 'Anta KT8'
    ];

    const linksAntaW = [
        "/products?line=anta_kt3", "/products?line=anta_kt7", "/products?line=anta_kt8"];

    const textsBrandsLiNingW = [
        'Way Of Wade', 'Yushuai', 'Sonic', 'Speed'
    ];

    const linksLiNingW = [
        "/products?line=li-ning_way_of_wade", "/products?line=li-ning_yushuai", "/products?line=li-ning_sonic", "/products?line=li-ning_speed"];

    const textsBrandsUAW = [
        'UA Curry 4', 'UA Curry 6', 'UA Curry 7', 'UA Curry 1', 'UA Curry 2', 'UA Curry 8', 'UA Curry 9', 'UA Curry 10', 'UA Curry 3', 'UA Curry 5'
    ];

    const linksUAW = [
        "/products?line=under_armour_curry_4", "/products?line=under_armour_curry_6", "/products?line=under_armour_curry_7", "/products?line=under_armour_curry_1", "/products?line=under_armour_curry_2", "/products?line=under_armour_curry_8", "/products?line=under_armour_curry_9", "/products?line=under_armour_curry_10", "/products?line=under_armour_curry_3", "/products?line=under_armour_curry_5"];

    const selectedGender = Cookies.get('selected_gender')

    return (
        <div>
            <div className={styles.catalogContainer}>
                {/* Categories */}
                <div className={styles.categoriesSection}>
                    <div className={styles.categoriesGrid}>
                        {(selectedGender === "M" ? ['Все кроссовки и кеды', 'Высокие кроссовки', 'Низкие кроссовки', 'Баскетбольные кроссовки', 'Футбольные бутсы', 'Кроссовки для спорта'] : ['Все кроссовки и кеды', 'Кроссовки', 'Кеды', 'Высокие кроссовки', 'Низкие кроссовки', 'Кроссовки для спорта']).map((category, idx) => (
                            <>
                                {idx !== 3 || selectedGender === "F" ? (
                                    <Link
                                        href={selectedGender === "M" ? linksCategoriesM[idx] : linksCategoriesW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <div key={idx} className={styles.categoryItem}>
                                            <Image
                                                src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Sneakers/Categories/${idx + 1}.png`}
                                                alt={category}
                                                width={700}
                                                height={700}
                                                className={styles.categoryImage}
                                            />
                                            <div className={styles.categoryText}>
                                                {category}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div key={idx} className={styles.categoryItem} onClick={() => handleOpenSection("basketball")}>
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Sneakers/Categories/${idx + 1}.png`}
                                            alt={category}
                                            width={700}
                                            height={700}
                                            className={styles.categoryImage}
                                        />
                                        <div className={styles.categoryText}>
                                            {category}
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}
                    </div>
                </div>

                {/* Popular Brands */}
                <div className={styles.brandsSection}>
                    <div className={styles.brandsTitle}>ПОПУЛЯРНЫЕ БРЕНДЫ</div>
                    <div className={styles.brandsGrid}
                         style={{
                             gridTemplateColumns: `repeat(${selectedGender === "M" ? 12 : 12}, 97px`,
                         }}>
                        {Array.from({length: 24}).map((_, idx) => (
                            <div key={idx} className={styles.brandCircle}>
                                <div className={styles.circle}>
                                    <Link
                                        href={selectedGender === "M" ? linksBrandsM[idx] : linksBrandsW[idx]}
                                        onClick={handleClose}
                                        style={{flex: 1}}
                                    >
                                        <Image
                                            src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/${selectedGender === "M" ? "Men" : "Women"}/Products/Sneakers/Brands/${idx + 1}.png`}
                                            alt="Brand Image"
                                            className={styles.circleImage}
                                            width={700}
                                            height={700}
                                            layout="responsive"
                                            quality={100}
                                        />
                                    </Link>
                                </div>
                                <div
                                    className={styles.circleText}>{selectedGender === "M" ? amountsBrandsM[idx] : amountsBrandsW[idx]}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Lines */}
                {selectedGender === "M" &&
                    <div className={styles.brandsSection}>
                        <div className={styles.brandsTitle}>ЛИНЕЙКИ КРОССОВОК</div>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=nike'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/1.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                        style={{marginTop: '0'}}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid1}`}>
                                {Array.from({length: 46}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksNikeM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Nike/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsNikeM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=jordan'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/2.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid2}`}>
                                {Array.from({length: 24}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksJordanM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Jordan/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsJordanM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=new_balance'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/3.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid3}`}>
                                {Array.from({length: 16}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksNewBalanceM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/New Balance/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsNewBalanceM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=adidas'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/4.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid4}`}>
                                {Array.from({length: 40}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksAdidasM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/adidas/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsAdidasM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=vans'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/5.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid5}`}>
                                {Array.from({length: 10}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksVansM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Vans/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsVansM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=asics'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/6.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid6}`}>
                                {Array.from({length: 14}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksAsicsM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Asics/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsAsicsM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=converse'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/7.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid7}`}>
                                {Array.from({length: 5}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksConverseM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Converse/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsConverseM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=anta'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/8.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid8}`}>
                                {Array.from({length: 3}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksAntaM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Anta/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsAntaM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=li-ning'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/9.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid9}`}>
                                {Array.from({length: 4}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksLiNingM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Li-Ning/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsLiNingM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=puma'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/10.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid10}`}>
                                {Array.from({length: 16}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksPumaM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Puma/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsPumaM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=reebok'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/11.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid11}`}>
                                {Array.from({length: 6}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksReebokM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Reebok/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsReebokM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=under_armour'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Photos/12.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid12}`}>
                                {Array.from({length: 10}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksUAM[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Men/Products/Sneakers/Under Armour/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsUAM[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                }

                {selectedGender === "F" &&
                    <div className={styles.brandsSection}>
                        <div className={styles.brandsTitle}>ЛИНЕЙКИ КРОССОВОК</div>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=adidas'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/1.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                        style={{marginTop: '0'}}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid4}`}>
                                {Array.from({length: 40}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksAdidasW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/adidas/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsAdidasW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=nike'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/2.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid1}`}>
                                {Array.from({length: 46}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksNikeW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Nike/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsNikeW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=jordan'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/3.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid2}`}>
                                {Array.from({length: 24}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksJordanW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Jordan/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsJordanW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=new_balance'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/4.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid3}`}>
                                {Array.from({length: 16}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksNewBalanceW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/New Balance/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsNewBalanceW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=converse'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/5.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid7}`}>
                                {Array.from({length: 5}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksConverseW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Converse/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsConverseW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=vans'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/6.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid5}`}>
                                {Array.from({length: 10}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksVansW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Vans/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsVansW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=puma'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/7.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid10}`}>
                                {Array.from({length: 16}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksPumaW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Puma/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsPumaW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=asics'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/8.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid6}`}>
                                {Array.from({length: 14}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksAsicsW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Asics/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsAsicsW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=reebok'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/9.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid11}`}>
                                {Array.from({length: 6}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksReebokW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Reebok/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsReebokW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=anta'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/10.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid8}`}>
                                {Array.from({length: 3}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksAntaW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Anta/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsAntaW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=li-ning'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/11.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid9}`}>
                                {Array.from({length: 4}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksLiNingW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Li-Ning/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsLiNingW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                        <>
                            <div>
                                <Link
                                    href={'/products?category=sneakers&line=under_armour'}
                                    onClick={handleClose}
                                    style={{flex: 1}}
                                >
                                    <Image
                                        src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Photos/12.png`}
                                        alt=''
                                        width={1000}
                                        height={1000}
                                        className={styles.brandsPhoto}
                                    />
                                    </Link>
                            </div>
                            <div className={`${styles.brandsGrid} ${styles.brandsGrid12}`}>
                                {Array.from({length: 10}).map((_, idx) => (
                                    <div key={idx} className={styles.brandCircle}>
                                        <Link
                                            href={linksUAW[idx]}
                                            onClick={handleClose}
                                            style={{flex: 1}}
                                        >
                                            <div className={styles.circle2}>
                                                <Image
                                                    src={`https://storage.yandexcloud.net/sellout-bucket/Images%20New%20Frontend/Mobile/Women/Products/Sneakers/Under Armour/${idx + 1}.png`}
                                                    alt="Brand Image"
                                                    className={styles.circleImage2}
                                                    width={700}
                                                    height={700}
                                                    layout="responsive"
                                                    quality={100}
                                                />
                                            </div>
                                        </Link>
                                        <div className={styles.circleText}>{textsBrandsUAW[idx]}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    </div>
                }


                <div className={styles.centerButton}>
                    <Link
                        href={'/products?category=sneakers&category=canvas_shoes'}
                        onClick={handleClose}
                        style={{textDecoration: 'none'}}
                    >
                        Посмотреть все кроссовки и кеды
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default observer(CatalogSneakersMobile);