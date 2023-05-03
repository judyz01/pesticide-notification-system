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
DECLARE current_location geography := ST_MakePoint(lon, lat)::geography;
BEGIN
	RETURN QUERY
	SELECT coordinates_view.use_no, coordinates_view.latitude, coordinates_view.longitude
	FROM coordinates_view
	WHERE ST_DWithin(
		coordinates_view.geog,
		current_location,
		radius
	);
	END;
	
$BODY$;

ALTER FUNCTION public.find_nearby_noi(numeric, numeric, numeric)
    OWNER TO dev;
