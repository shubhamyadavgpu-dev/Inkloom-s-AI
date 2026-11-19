# Inkloom AI — Database Relationship Notes

The current MVP database contains three tables.

```text
submissions (1) -------- (0..many) analyses
      |                         |
      |                         +-- submission_id (nullable FK)
      |
      +-- id (PK)

brand_rules
  +-- id (PK)
  +-- active rules are read by the analysis endpoint
```

## `submissions`
Stores content submitted for review.

| Column | Purpose |
|---|---|
| `id` | Primary key |
| `title` | Submission title |
| `category` | Content category, such as Marketing or Social |
| `owner` | Person who submitted the content |
| `content` | Submitted text/content |
| `status` | `pending`, `review`, `approved`, or `revision` |
| `created_at` | Creation timestamp |
| `updated_at` | Automatically updated timestamp |

## `brand_rules`
Stores the active brand rules used by the rule-based analysis endpoint.

| Column | Purpose |
|---|---|
| `id` | Primary key |
| `name` | Short rule title |
| `description` | Rule text and phrases to check |
| `active` | Whether the rule is currently used |
| `created_at` | Creation timestamp |
| `updated_at` | Automatically updated timestamp |

## `analyses`
Stores analysis results as JSON.

| Column | Purpose |
|---|---|
| `id` | Primary key |
| `submission_id` | Optional reference to a submission |
| `score` | Score from 0 to 100 |
| `finding_count` | Number of detected findings |
| `result_json` | Full analysis response |
| `created_at` | Analysis timestamp |

A submission can have multiple analysis records. If a submission is deleted, its analysis records remain, with `submission_id` set to `NULL`.
