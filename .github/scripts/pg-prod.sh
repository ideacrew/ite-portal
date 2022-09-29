cd dist/apps/provider-gateway
aws s3 sync --acl public-read . s3://provider-gateway-dbh-ite-com/ --delete
invalidationId=`AWS_MAX_ATTEMPTS=999 aws cloudfront create-invalidation --distribution-id EPOMMR5L2P03T --output text --query 'Invalidation.Id' --paths '/*'`
aws cloudfront wait invalidation-completed --distribution-id EPOMMR5L2P03T --id ${invalidationId}
