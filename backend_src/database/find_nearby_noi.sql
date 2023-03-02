-- FUNCTION: public.find_nearby_noi(numeric, numeric, numeric)

-- DROP FUNCTION IF EXISTS public.find_nearby_noi(numeric, numeric, numeric);

CREATE OR REPLACE FUNCTION public.find_nearby_noi(
	lat numeric,
	lon numeric,
	radius numeric)
    RETURNS TABLE(use_no numeric, latitude numeric, longitude numeric) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
	RETURN QUERY
	SELECT *
	FROM coordinates
	WHERE ST_DWithin(
		ST_MakePoint(coordinates.longitude, coordinates.latitude)::geography,
		ST_MakePoint(lon, lat)::geography,
		radius
	);
	END;
	
$BODY$;

ALTER FUNCTION public.find_nearby_noi(numeric, numeric, numeric)
    OWNER TO dev;
