-- Table: public.restricted_products

-- DROP TABLE IF EXISTS public.restricted_products;

CREATE TABLE IF NOT EXISTS public.restricted_products
(
    prodno numeric NOT NULL,
    mfg_firmno character varying COLLATE pg_catalog."default",
    reg_firmno character varying COLLATE pg_catalog."default",
    label_seq_no character varying COLLATE pg_catalog."default",
    revision_no character varying COLLATE pg_catalog."default",
    fut_firmno character varying COLLATE pg_catalog."default",
    prodstat_ind character varying COLLATE pg_catalog."default",
    product_name character varying COLLATE pg_catalog."default",
    show_regno character varying COLLATE pg_catalog."default",
    aer_grnd_ind character varying COLLATE pg_catalog."default",
    agriccom_sw character varying COLLATE pg_catalog."default",
    confid_sw character varying COLLATE pg_catalog."default",
    density character varying COLLATE pg_catalog."default",
    formula_cd character varying COLLATE pg_catalog."default",
    full_exp_dt character varying COLLATE pg_catalog."default",
    full_iss_dt character varying COLLATE pg_catalog."default",
    fumigant_sw character varying COLLATE pg_catalog."default",
    gen_pest_ind character varying COLLATE pg_catalog."default",
    lastup_dt character varying COLLATE pg_catalog."default",
    mfg_ref_sw character varying COLLATE pg_catalog."default",
    prod_inac_dt character varying COLLATE pg_catalog."default",
    reg_dt character varying COLLATE pg_catalog."default",
    reg_type_ind character varying COLLATE pg_catalog."default",
    rodent_sw character varying COLLATE pg_catalog."default",
    signlwrd_ind character varying COLLATE pg_catalog."default",
    soilappl_sw character varying COLLATE pg_catalog."default",
    specgrav_sw character varying COLLATE pg_catalog."default",
    spec_gravity character varying COLLATE pg_catalog."default",
    condreg_sw character varying COLLATE pg_catalog."default",
    CONSTRAINT restricted_products_pkey1 PRIMARY KEY (prodno)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.restricted_products
    OWNER to dev;

GRANT ALL ON TABLE public.restricted_products TO dev;
-- Index: rp_prodno_idx

-- DROP INDEX IF EXISTS public.rp_prodno_idx;

CREATE INDEX IF NOT EXISTS rp_prodno_idx
    ON public.restricted_products USING btree
    (prodno ASC NULLS LAST)
    TABLESPACE pg_default;