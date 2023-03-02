-- FUNCTION: public.find_nearby_noi_data(numeric, numeric, numeric)

-- DROP FUNCTION IF EXISTS public.find_nearby_noi_data(numeric, numeric, numeric);

CREATE OR REPLACE FUNCTION public.find_nearby_noi_data(
	lat numeric,
	lon numeric,
	radius numeric)
    RETURNS TABLE(use_no numeric, prodno numeric, product_name character varying, aer_grnd_ind character varying, fumigant_sw character varying, chem_code numeric, chemname character varying, acre_treated numeric, unit_treated character, applic_dt date, applic_time time without time zone, aer_gnd_ind character, latitude numeric, longitude numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	SELECT
		udc19_50.use_no,
		udc19_50.prodno,
		restricted_products.product_name, 
		restricted_products.aer_grnd_ind, 
		restricted_products.fumigant_sw, 
		udc19_50.chem_code, chemicals.chemname, 
		udc19_50.acre_treated, 
		udc19_50.unit_treated, 
		CAST(udc19_50.applic_dt AS DATE), 
		TO_TIMESTAMP(TO_CHAR(udc19_50.applic_time, 'fm0000'), 'HH24MI')::TIME, 
		udc19_50.aer_gnd_ind, 
		a.latitude, 
		a.longitude
	FROM udc19_50 
	INNER JOIN (SELECT * FROM find_nearby_noi(lat, lon, radius)) a 
	ON udc19_50.use_no=a.use_no
	INNER JOIN restricted_products
	ON udc19_50.prodno=restricted_products.prodno
	INNER JOIN chemicals
	on udc19_50.chem_code=chemicals.chem_code;
END;
$BODY$;

ALTER FUNCTION public.find_nearby_noi_data(numeric, numeric, numeric)
    OWNER TO dev;
