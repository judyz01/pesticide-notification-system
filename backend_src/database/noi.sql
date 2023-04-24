-- Table: public.noi

-- DROP TABLE IF EXISTS public.noi;

CREATE TABLE IF NOT EXISTS public.noi
(
    use_no numeric,
    prodno numeric,
    chem_code numeric,
    prodchem_pct numeric,
    lbs_chm_used numeric,
    lbs_prd_used numeric,
    amt_prd_used numeric,
    unit_of_meas character(2) COLLATE pg_catalog."default",
    acre_planted numeric,
    unit_planted character(1) COLLATE pg_catalog."default",
    acre_treated numeric,
    unit_treated character(1) COLLATE pg_catalog."default",
    applic_cnt numeric,
    applic_dt text COLLATE pg_catalog."default",
    applic_time numeric,
    county_cd character(2) COLLATE pg_catalog."default",
    base_ln_mer character(1) COLLATE pg_catalog."default",
    township character(2) COLLATE pg_catalog."default",
    tship_dir character(1) COLLATE pg_catalog."default",
    range character(2) COLLATE pg_catalog."default",
    range_dir character(1) COLLATE pg_catalog."default",
    section character(2) COLLATE pg_catalog."default",
    site_loc_id character(15) COLLATE pg_catalog."default",
    grower_id character(11) COLLATE pg_catalog."default",
    license_no character(13) COLLATE pg_catalog."default",
    planting_seq numeric,
    aer_gnd_ind character(1) COLLATE pg_catalog."default",
    site_code numeric,
    qualify_cd numeric,
    batch_no numeric,
    document_no character(8) COLLATE pg_catalog."default",
    summary_cd numeric,
    record_id character(1) COLLATE pg_catalog."default",
    comtrs text COLLATE pg_catalog."default",
    error_flag character(1) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.noi
    OWNER to dev;

GRANT ALL ON TABLE public.noi TO dev;
-- Index: applic_date_time_idx

-- DROP INDEX IF EXISTS public.applic_date_time_idx;

CREATE INDEX IF NOT EXISTS applic_date_time_idx
    ON public.noi USING btree
    (applic_dt COLLATE pg_catalog."default" ASC NULLS LAST, applic_time ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: chem_code_idx

-- DROP INDEX IF EXISTS public.chem_code_idx;

CREATE INDEX IF NOT EXISTS chem_code_idx
    ON public.noi USING btree
    (chem_code ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: noi_data

-- DROP INDEX IF EXISTS public.noi_data;

CREATE INDEX IF NOT EXISTS noi_data
    ON public.noi USING btree
    (use_no ASC NULLS LAST, prodno ASC NULLS LAST, chem_code ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: prodno_idx

-- DROP INDEX IF EXISTS public.prodno_idx;

CREATE INDEX IF NOT EXISTS prodno_idx
    ON public.noi USING btree
    (prodno ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: use_no_idx

-- DROP INDEX IF EXISTS public.use_no_idx;

CREATE INDEX IF NOT EXISTS use_no_idx
    ON public.noi USING btree
    (use_no ASC NULLS LAST)
    TABLESPACE pg_default;