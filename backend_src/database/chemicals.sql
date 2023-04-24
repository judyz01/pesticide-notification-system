-- Table: public.chemicals

-- DROP TABLE IF EXISTS public.chemicals;

CREATE TABLE IF NOT EXISTS public.chemicals
(
    chem_code numeric,
    chemalpha_cd numeric,
    chemname character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.chemicals
    OWNER to dev;

GRANT ALL ON TABLE public.chemicals TO dev;
-- Index: chemicals_chem_code_idx

-- DROP INDEX IF EXISTS public.chemicals_chem_code_idx;

CREATE INDEX IF NOT EXISTS chemicals_chem_code_idx
    ON public.chemicals USING btree
    (chem_code ASC NULLS LAST)
    TABLESPACE pg_default;