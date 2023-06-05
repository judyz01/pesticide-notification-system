-- FUNCTION: public.find_nearby_noi_data(numeric, numeric, numeric)

-- DROP FUNCTION IF EXISTS public.find_nearby_noi_data(numeric, numeric, numeric);

CREATE OR REPLACE FUNCTION public.find_nearby_noi_data(
	lat numeric,
	lon numeric,
	radius numeric)
    RETURNS TABLE(use_no numeric, prodno numeric, product_name character varying, aer_grnd_ind character varying, fumigant_sw character varying, chem_code numeric, chemname character varying, acre_treated numeric, unit_treated character, applic_dt date, applic_time time without time zone, aer_gnd_ind character, county_cd character, product_label_link character varying, latitude numeric, longitude numeric, distance numeric, address character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	SELECT DISTINCT
		restricted_noi_view.use_no,
		restricted_noi_view.prodno,
		restricted_noi_view.product_name, 
		restricted_noi_view.aer_grnd_ind, 
		restricted_noi_view.fumigant_sw, 
		restricted_noi_view.chem_code, 
		restricted_noi_view.chemname, 
		restricted_noi_view.acre_treated, 
		restricted_noi_view.unit_treated, 
		restricted_noi_view.applic_dt, 
		restricted_noi_view.applic_time,
		restricted_noi_view.aer_gnd_ind,
		restricted_noi_view.county_cd,
		restricted_noi_view.product_label_link,
		a.latitude, 
		a.longitude,
		haversine(a.latitude, a.longitude, lat, lon) distance,
		address_view.address
	FROM restricted_noi_view
	INNER JOIN (SELECT * FROM find_nearby_noi(lat, lon, radius)) a
	ON restricted_noi_view.use_no=a.use_no
	LEFT JOIN address_view
	ON address_view.latitude = a.latitude AND address_view.longitude = a.longitude;
END;
$BODY$;

ALTER FUNCTION public.find_nearby_noi_data(numeric, numeric, numeric)
    OWNER TO dev;
