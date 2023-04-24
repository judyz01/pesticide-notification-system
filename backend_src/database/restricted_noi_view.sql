-- View: public.restricted_noi_view

-- DROP VIEW public.restricted_noi_view;

CREATE OR REPLACE VIEW public.restricted_noi_view
 AS
 SELECT noi.use_no,
    noi.prodno,
    noi.chem_code,
    noi.acre_treated,
    noi.unit_treated,
    noi.applic_dt::date AS applic_dt,
    to_timestamp(to_char(noi.applic_time, 'fm0000'::text), 'HH24MI'::text)::time without time zone AS applic_time,
    noi.aer_gnd_ind,
    noi.county_cd,
    restricted_products.product_name,
    restricted_products.aer_grnd_ind,
    restricted_products.fumigant_sw,
    chemicals.chemname
   FROM noi
     JOIN restricted_products ON noi.prodno = restricted_products.prodno
     JOIN chemicals ON noi.chem_code = chemicals.chem_code;

ALTER TABLE public.restricted_noi_view
    OWNER TO dev;

GRANT ALL ON TABLE public.restricted_noi_view TO dev;

