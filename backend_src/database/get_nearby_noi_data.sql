-- FUNCTION: public.get_nearby_noi_data(numeric, numeric, numeric)

-- DROP FUNCTION IF EXISTS public.get_nearby_noi_data(numeric, numeric, numeric);

CREATE OR REPLACE FUNCTION public.get_nearby_noi_data(
	lat numeric,
	lon numeric,
	radius numeric)
    RETURNS TABLE(use_no numeric, prodno numeric, product_name character varying, aer_grnd_ind character varying, fumigant_sw character varying, chem_code numeric, chemname character varying, acre_treated numeric, unit_treated character, applic_dt date, applic_time time without time zone, aer_gnd_ind character, latitude numeric, longitude numeric, distance numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	SELECT a.*, haversine(a.latitude, a.longitude, lat, lon) distance
	FROM find_nearby_noi_data(lat, lon, radius) a;
END;
$BODY$;

ALTER FUNCTION public.get_nearby_noi_data(numeric, numeric, numeric)
    OWNER TO dev;
