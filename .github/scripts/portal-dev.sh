cd dist/apps/ite-portal
aws s3 sync --acl public-read . s3://portal-dev-dbh-ite-com/ --delete
invalidationId=`AWS_MAX_ATTEMPTS=999 aws cloudfront create-invalidation --distribution-id EVD9XJF7IQQ3F --output text --query 'Invalidation.Id' --paths '/*'`
aws cloudfront wait invalidation-completed --distribution-id EVD9XJF7IQQ3F --id ${invalidationId}
