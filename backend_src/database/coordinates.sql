-- Table: public.coordinates

-- DROP TABLE IF EXISTS public.coordinates;

CREATE TABLE IF NOT EXISTS public.coordinates
(
    use_no numeric,
    latitude numeric,
    longitude numeric,
    geog geography(Point,4326)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.coordinates
    OWNER to dev;

GRANT ALL ON TABLE public.coordinates TO dev;
-- Index: coordinates_geog_idx

-- DROP INDEX IF EXISTS public.coordinates_geog_idx;

CREATE INDEX IF NOT EXISTS coordinates_geog_idx
    ON public.coordinates USING gist
    (geog)
    TABLESPACE pg_default;
-- Index: coordinates_use_no_idx

-- DROP INDEX IF EXISTS public.coordinates_use_no_idx;

CREATE INDEX IF NOT EXISTS coordinates_use_no_idx
    ON public.coordinates USING btree
    (use_no ASC NULLS LAST)
    TABLESPACE pg_default;