-- FUNCTION: public.haversine(numeric, numeric, numeric, numeric)

-- DROP FUNCTION IF EXISTS public.haversine(numeric, numeric, numeric, numeric);

CREATE OR REPLACE FUNCTION public.haversine(
	lat1 numeric,
	lng1 numeric,
	lat2 numeric,
	lng2 numeric)
    RETURNS numeric
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
	BEGIN
    return 2 * 3961 
        * asin(sqrt(
            pow(sin((radians(Lat2) - radians(Lat1)) / 2), 2)
            + cos(radians(Lat1))
            * cos(radians(Lat2))
            * pow(sin((radians(Lng2) - radians(Lng1)) / 2), 2)
        ));
	END;
$BODY$;

ALTER FUNCTION public.haversine(numeric, numeric, numeric, numeric)
    OWNER TO dev;
