-- View: public.coordinates_view

-- DROP VIEW public.coordinates_view;

CREATE OR REPLACE VIEW public.coordinates_view
 AS
 SELECT coordinates.use_no,
    coordinates.latitude,
    coordinates.longitude,
    coordinates.geog
   FROM coordinates;

ALTER TABLE public.coordinates_view
    OWNER TO dev;

