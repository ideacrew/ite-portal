cd dist/apps/ite-portal
aws s3 sync --acl public-read . s3://portal-uat-dbh-ite-com/ --delete
invalidationId=`AWS_MAX_ATTEMPTS=999 aws cloudfront create-invalidation --distribution-id E27MWNAHLRBCZQ --output text --query 'Invalidation.Id' --paths '/*'`
aws cloudfront wait invalidation-completed --distribution-id E27MWNAHLRBCZQ --id ${invalidationId}
